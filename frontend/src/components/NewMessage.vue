<template>
    <div class="container mt-3">

        <h2>Publier un nouveau message</h2>

        <form name="form" @submit.prevent="createMessage" class="row py-3">  

            <div class="col-sm-2 form-group mt-2">
                <input v-model="message.title" type="string" class="form-control" id="messageTitle" placeholder="titre" required>
            </div>

            <div class="col-sm-8 form-group mt-2">
                <input v-model="message.content" type="text" class="form-control" id="messageContent" placeholder="contenu du message" required>
            </div>

            <div class="col-sm-2 d-flex justify-content-start mt-2">
                <button type="submit" class="btn btn-primary">Valider</button>
            </div>

        </form>

        <div class="mb-5">
            <ul class="list-group d-flex flex-column-reverse">
                <li class="list-group-item mt-3" v-for="post in posts" :key="post.posts">
                    <div class=row>
                        <div class=col-11>
                            <h5>{{ post.title }} </h5>
                            <p>{{ post.content }}</p>
                        </div>
                        <div class=col-1>
                            <button type="submit" @click="deleteMessage" class="btn btn-light btn-sm my-2"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>

                    <input v-model="comment" v-on:keyup.enter="addComment" type="text" class="form-control" placeholder="Ecrivez un commentaire">

                </li>
            </ul> 
        </div>

    </div>
</template>

<script>

import API from '@/axios';

export default {
    
  name: 'NewMessage',
    data() {
    return {
        message: {
            title: '',
            content: '',
        },
        comment: '', 
        posts: []
    }
  },

  methods: {

    showMessage() {
        API.get('message/')
        .then(response => {
            this.posts = response.data;
            console.log(response.data);
        })    
        .catch(error => { console.log(error); 
        })
    },

    createMessage() {
         
        this.$validator.validateAll().then(isValid => {
            if (isValid) { 
                    API.post('message/new', {
                    title: this.message.title,
                    content: this.message.content,
                })  
                .then(response => {
                    this.message.title = "",
                    this.message.content = ""
                    this.showMessage(); 
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }) 
    },

    deleteMessage() {
         
        API.delete('message')  
            .then(response => { 
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    },

    addComment() {

        API.post('message/comment', {
            content: this.comment
        })  
            .then(response => {
            console.log(response);
            })
            .catch(error => {
                console.log(error);
            }) 
        } 
    },

    mounted() {
        this.showMessage();
    }
}
</script>