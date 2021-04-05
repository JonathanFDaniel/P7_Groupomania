<template>
    <div class="container mt-3">

        <h2>Publier un nouveau message</h2>

        <form class="row py-3">  

            <div class="col-sm-2 form-group mt-2">
                <input type="string" class="form-control" id="messageTitle" placeholder="titre">
            </div>

            <div class="col-sm-8 form-group mt-2">
                <input type="text" class="form-control" id="messageContent" placeholder="contenu du message">
            </div>

            <div class="col-sm-2 d-flex justify-content-start mt-2">
                <button type="submit" class="btn btn-primary">Valider</button>
            </div>

        </form>

    </div>
</template>

<script>

export default {
  name: 'NewMessage',
  components: {
  }
}
</script>