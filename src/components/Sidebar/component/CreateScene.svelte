<script lang="ts">
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";
  import Modal from "carbon-components-svelte/src/Modal/Modal.svelte";
  import TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte";
  import { scenes } from "src/db/storeScenes";
  import { state } from "src/db/storeState";
  import { SceneInterface } from "src/schema/scene/scene.interface";
  import { SceneClass } from "src/schema/scene/scene.class";
  import { dialogFn, PropObject } from "src/components/Dialog/Dialog";
  export let show = false;

  export let chapterId: string;
  export let projectId: string;

  export let title = "";
  const content = title => {
    return {
      time: 0,
      version: "2.22.2",
      blocks: [
        {
          id: "mV8xlymh4u",
          type: "header",
          data: {
            text: title,
          },
        },
      ],
    };
  };

  type ResType = {
    create: boolean;
    scene: SceneInterface;
  };
  const createScene = async () => {
    const newScene: SceneInterface = new SceneClass(
      chapterId,
      projectId,
      title,
      content(title)
    );

    const res: ResType = scenes.createScene(newScene);

    if (res.create) {
      const DialogConfig: PropObject = {
        kind: "success",
        title: "创建成功",
        subtitle: res.scene.title,
        caption: res.scene.createDate,
      };
      dialogFn(DialogConfig);
      state.setCurrentScene(res.scene.id);
      show = false;
      title = "";
      push("/book/write/" + res.scene.id);
    }
    // state.setCurrentScene(res.scene.id);
    // state.setCurrentScene(id);
    // show = false;
    // title = "";
    // push("/book/write/" + res.scene.id);
  };

</script>

{#if show}
  <Modal
    open={show}
    modalHeading={`${$_('sidebar.modal.newScene.header')}`}
    primaryButtonText={$_('sidebar.modal.newScene.button')}
    primaryButtonDisabled={title.length === 0}
    secondaryButtonText="取消"
    iconDescription="关闭对话框"
    on:click:button--primary={createScene}
    on:click:button--secondary={() => (show = false)}
    on:open={() => console.log('apen')}
    on:close={() => (show = false)}>
    <TextInput
      labelText={$_('sidebar.modal.title')}
      placeholder={$_('placeholder.title')}
      inline
      bind:value={title} />
  </Modal>
{/if}
