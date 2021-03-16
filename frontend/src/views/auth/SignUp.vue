
<template>
    <div class="container mt-3">

        <h1>Créer un compte</h1>

        <form>

            <div class="form-group mt-3">
                <label for="firstname">Prénom</label>
                <input type="string" class="form-control" id="firstname" placeholder="Entrez votre Prénom">
            </div>

            <div class="form-group mt-3">
                <label for="lastname">Nom</label>
                <input type="string" class="form-control" id="lastname" placeholder="Entrez votre Nom">
            </div>

            <div class="form-group mt-3">
                <label for="email">Adresse Email</label>
                <input type="email" class="form-control" id="email" placeholder="Entrez votre email">
            </div>

            <div class="form-group mt-3">
                <label for="password">Mot de Passe</label>
                <input type="password" class="form-control" id="password" placeholder="mot de passe">
            </div>

            <div class="d-flex justify-content-start mt-3">
                <router-link class="nav-link" to="/"><button type="submit" class="btn btn-primary">S'inscrire</button></router-link>
                <router-link class="nav-link" to="/signin"><button type="submit" class="btn btn-success">Se connecter</button></router-link>
            </div>

        </form>
    </div>
</template>

<script>

export default {
  name: 'Signup',
  components: {
   
  }
}
</script>