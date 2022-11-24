<script>
    import {getIntroduction} from '../hooks/auth';

    let name = 'Roman';
    let error = ''

    let update = false;
    let videoInfoPromise;

    const handleClick = async () => {
        videoInfoPromise = await getIntroduction(1, name);
    }

</script>
<main>
    <div class="d-block mx-auto mb-4">
        <button on:click={handleClick} class="btn btn-primary w-100 m-20">
            Get introduction
        </button>


        {#await videoInfoPromise}
            <div>...loading</div>
        {:then apiResponse}
                {#if apiResponse}
                    <video width="920" height="440" controls autoplay style="display: block; margin: 0 auto;">
                        <source src="{apiResponse}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                {/if}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</main>