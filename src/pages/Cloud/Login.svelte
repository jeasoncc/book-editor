<script>
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";
  import { reloadWindow } from "../../bridge";
  import { state } from "../../storesold";

  import {
    InputEmail,
    InputPassword,
    ButtonGroup,
    Button,
  } from "../../components/Forms";

  import cloud from "../../appwrite";
  import Alert from "../../shared/Alert.svelte";

  let showAlert = false;
  let showAlertText;

  const form = {
    email: "",
    pass: "",
  };

  $: checkForm = form.email !== "" && form.pass !== "";

  let loginButtonLoading = false;

  const login = () => {
    loginButtonLoading = true;
    if (!checkForm) {
      showAlert = true;
      showAlertText = $_("cloud.login.responses.empty");
      loginButtonLoading = false;
      return;
    }
    cloud.login(form.email, form.pass).then(
      () => {
        state.setLogin(true);
        window.location.hash = "#/cloud";
        reloadWindow();
      },
      () => {
        showAlert = true;
        showAlertText = $_("cloud.login.responses.failed");
        loginButtonLoading = false;
      }
    );
  };

</script>

{#if !$state.isUserLoggedIn}
  <div in:fade={{ duration: 100 }}>
    <h2>{$_('cloud.login.title')}</h2>
    <Alert danger bind:show={showAlert}>
      <span class="lnr lnr-warning">{showAlertText}</span>
    </Alert>
    <form on:submit|preventDefault={login}>
      <InputEmail
        label={$_('cloud.login.email')}
        placeholder="xiaomiquan@163.com"
        bind:value={form.email} />
      <InputPassword
        label={$_('cloud.login.password')}
        placeholder="******"
        bind:value={form.pass} />
      <ButtonGroup>
        <Button
          on:click={login}
          loading={loginButtonLoading}
          disabled={!checkForm}>
          {$_('cloud.login.button')}
        </Button>
      </ButtonGroup>
    </form>
    <small class="link" on:click={() => push('/cloud/reset-password')}>
      {$_('cloud.reset.title')}
    </small>
    <h2>{$_('cloud.login.register')}</h2>
    <ButtonGroup>
      <Button on:click={() => push('/cloud/register')}>
        {$_('cloud.register.title')}
      </Button>
    </ButtonGroup>
  </div>
{/if}

<style>
  .link {
    cursor: pointer;
  }
  .link:hover {
    text-decoration: underline;
  }

</style>
