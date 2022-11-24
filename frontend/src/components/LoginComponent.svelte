<script>
    import { loginUser } from '../hooks/auth';
    import { store } from '../hooks/auth';

    let email = '';
    let password = '';
    let error = ''

    async function login() {
        const token = await loginUser( email, password )

        if ( token ) {
            console.log(token)
            $store = token
            if ( error ) error = ''
        }
        else {
            error = 'Incorrect username and password.'
            console.log("Incorrect username and password.")
        }

    }

</script>

<form on:submit|preventDefault={login} style="width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;">

    <div class="mb-3">
        <label for="username" class="form-label">Email</label>
        <input type="email" class="form-control" id="username" bind:value={email} />
    </div>

    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" bind:value={password} />
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
    <div id="error_message" class="text-danger">
        <small>{error}</small>
    </div>

</form>