<script lang="ts">
  import { fade } from "svelte/transition";
  import { _, locales, locale } from "svelte-i18n";
  import { push } from "svelte-spa-router";
  // import { settings } from "../storesold";
  import Select from "carbon-components-svelte/src/Select/Select.svelte";
  import SelectItem from "carbon-components-svelte/src/Select/SelectItem.svelte";
  import Form from "carbon-components-svelte/src/Form/Form.svelte";
  import FormGroup from "carbon-components-svelte/src/FormGroup/FormGroup.svelte";
  import Theme from "carbon-components-svelte/src/Theme/Theme.svelte";
  import { settings } from "src/db/storeSettings";
  import EditorJS from "@editorjs/editorjs";
  import { onMount } from "svelte";
  import { settingConent } from "src/schema/scene/scene.class";

  $: languages = $locales.map(locale => ({
    value: locale,
    text: $_(`settings.appereance.language.${locale}`),
  }));
  onMount(() => {
    // const editor = new EditorJS({
    //   holder:"editorReadonly",
    //   data: settingConent,
    //   readOnly:true
    // });
  });

</script>

<div class="settings" in:fade={{ duration: 100 }}>
  <Form>
    <h2>Settings</h2>
    <FormGroup>
      <Theme
        render="select"
        bind:theme={$settings.theme}
        select={{ themes: ['white', 'g10', 'g80', 'g90', 'g100'], labelText: 'Select a theme' }} />
    </FormGroup>
    <!-- <FormGroup>
         <Select
         labelText={$_('settings.appereance.language.title')}
         bind:selected={$settings.language}>
         {#each languages as language}
         <SelectItem value={language.value} text={language.text} />
         {/each}
         </Select> -->
    <!-- </FormGroup> -->
    <div id="editorReadonly" />
    <!-- <FormGroup>
      <Theme bind:theme />
      <RadioButtonGroup
        legendText={$_('settings.appereance.theme.title')}
        bind:selected={theme}>
        {#each ['white', 'g10', 'g80', 'g90', 'g100'] as value}
          <RadioButton labelText={value} {value} />
        {/each}
      </RadioButtonGroup>
    </FormGroup> -->
    <!-- <FormGroup>
      <h2>{$_('settings.common.title')}</h2>
      <Checkbox
        labelText={$_('settings.common.lastLocation')}
        bind:value={$settings.lastLocation} />

      <h2>{$_('header.write.title')}</h2>
    </FormGroup> -->
    <!-- <FormGroup>
      <Checkbox
      disabled
        labelText={$_('settings.write.autosave')}
        bind:value={$settings.autosave} />
    </FormGroup>
    <FormGroup>
      <Checkbox
        labelText={$_('settings.write.spellCheck')}
        bind:value={$settings.spellCheck} />
    </FormGroup> -->
  </Form>

</div>

