<script>
  import RoleInterface from "src/schema/role/role.interface";
  import UnorderedList from "carbon-components-svelte/src/UnorderedList/UnorderedList.svelte";
  import ListItem from "carbon-components-svelte/src/ListItem/ListItem.svelte";

  export let role: RoleInterface;

</script>

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
