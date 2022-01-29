<script lang="ts">
  import { state } from "./../../db/storeState";
  import ModifyRoleModal from "./components/ModifyRoleModal.svelte";
  import { RoleClass } from "./../../schema/role/role.class";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import Button from "carbon-components-svelte/src/Button/Button.svelte";
  import ButtonSet from "carbon-components-svelte/src/Button/ButtonSet.svelte";
  import Grid from "carbon-components-svelte/src/Grid/Grid.svelte";
  import Row from "carbon-components-svelte/src/Grid/Row.svelte";
  import Column from "carbon-components-svelte/src/Grid/Column.svelte";
  import Add16 from "carbon-icons-svelte/lib/Add16";
  import Search from "carbon-components-svelte/src/Search/Search.svelte";
  import Accordion from "carbon-components-svelte/src/Accordion/Accordion.svelte";
  import AccordionItem from "carbon-components-svelte/src/Accordion/AccordionItem.svelte";
  import Edit16 from "carbon-icons-svelte/lib/Edit16";
  import UnorderedList from "carbon-components-svelte/src/UnorderedList/UnorderedList.svelte";
  import ListItem from "carbon-components-svelte/src/ListItem/ListItem.svelte";
  import { throttle } from "throttle-debounce";
  import RoleModal from "./components/CreateRoleModal.svelte";
  import RoleInterface from "src/schema/role/role.interface";
  import { roles } from "src/db/storeRoles";
  import { dialogFn, PropObject } from "src/components/Dialog/Dialog";
  import moment from "moment";

  let showCreateCard = false;
  let showModifyRole = false;
  let searchInput = "";

  let role = new RoleClass();
  let modifyRole = new RoleClass();

  const createCard = throttle(500, () => {
    role.project = $state.currentProject;
    const res = roles.createRole(role);
    if (res.create) {
      showCreateCard = false;
      const dialogConfig: PropObject = {
        kind: "success",
        title: "创建角色成功",
        subtitle: "你创建了一个角色：" + role.name,
        caption: res.role.createDate,
      };
      dialogFn(dialogConfig);
      role = new RoleClass();
    }
  });

  const openModifyRoleFn = throttle(500, (role: RoleInterface) => {
    showModifyRole = !showModifyRole;
    modifyRole = role;
  });
  const modifyRoleFn = throttle(500, () => {
    roles.setCard(modifyRole);
    showModifyRole = !showModifyRole;
    const DialogConfig: PropObject = {
      kind: "info",
      title: "修改成功",
      subtitle: modifyRole.name,
      caption: moment().format("YYYY-MM-DD-HH:mm:ss"),
    };
    dialogFn(DialogConfig);
  });

  const removeRoleFn = throttle(500, () => {
    roles.removeCard(modifyRole.id);
    showModifyRole = !showModifyRole;
    const DialogConfig: PropObject = {
      kind: "info",
      title: "已经删除",
      subtitle: modifyRole.name,
      caption: moment().format("YYYY-MM-DD-HH:mm:ss"),
    };
    dialogFn(DialogConfig);
  });
  // $: filteredRoles = $roles.filter((role:RoleInterface) => role.project == $state.currentProject);

  $: filteredRoles = searchInput
    ? $roles.filter(
        (role: RoleInterface) =>
          role.project == $state.currentProject &&
          role.name.includes(searchInput)
      )
    : $roles.filter(
        (role: RoleInterface) => role.project == $state.currentProject
      );

</script>

<RoleModal
  modalHeading={$_('roleCenterPage.create.title')}
  primaryButtonText={$_('roleCenterPage.create.primaryButtonText')}
  {role}
  {createCard}
  bind:showCreateCard />
<ModifyRoleModal
  modalHeading={$_('roleCenterPage.modify.title')}
  primaryButtonText={$_('roleCenterPage.modify.primaryButtonText')}
  bind:role={modifyRole}
  bind:showModifyRole
  {modifyRoleFn}
  {removeRoleFn} />

<div in:fade={{ duration: 200 }}>
  {#if $state.currentProject}
    <Grid fullWidth>
      <Row>
        <Column noGutter lg={1}>
          <Button
            kind="ghost"
            iconDescription={$_('roleCenterPage.button')}
            on:click={() => (showCreateCard = true)}
            icon={Add16} />
        </Column>
        <Column noGutter lg={15}>
          <Search
            expandable
            placeholder={$_('cards.search')}
            bind:value={searchInput}
            autocomplete="off" />
        </Column>
      </Row>
      <br />
      <Row>
        <Accordion size="sm">
          {#each filteredRoles as role}
            <AccordionItem>
              <div slot="title">
                <h5>
                  <Button
                    icon={Edit16}
                    on:click={() => openModifyRoleFn(role)}
                    kind="ghost">
                    {role.name}
                  </Button>
                </h5>
              </div>
              <p>
                <UnorderedList>
                  <ListItem>
                    人物别名：
                    <UnorderedList nested>
                      {#each role.alias as alia}
                        <ListItem>{alia}</ListItem>
                      {/each}
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    人物形象：
                    <UnorderedList nested>
                      {#each role.image as img}
                        <ListItem>{img}</ListItem>
                      {/each}
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    人物身份：
                    <UnorderedList nested>
                      {#each role.identity as iden}
                        <ListItem>{iden}</ListItem>
                      {/each}
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    人物关系：
                    <UnorderedList nested>
                      {#each role.relationships as relationship}
                        <ListItem>{relationship}</ListItem>
                      {/each}
                    </UnorderedList>
                  </ListItem>
                  <ListItem>人物的基本设定： {role.basicSettings}</ListItem>
                  <ListItem>人物的主要经历：{role.experience}</ListItem>
                </UnorderedList>
              </p>
            </AccordionItem>
          {/each}
        </Accordion>
      </Row>
    </Grid>
    <ButtonSet />
  {/if}
</div>
