<template>
  <v-app :dark="true">
    <v-container fill-height>
      <div>
        <v-alert
          v-if="isMessage"
          border="bottom"
          colored-border
         :type="iconsMessage"
          dismissible
          elevation="10"
        >
          {{ messageLogin }}
        </v-alert>
      </div>
      <v-layout justify-center align-center>
        <v-flex xs12 sm6 ms4 lg3>
          <v-card class="elevation-12">

            <v-toolbar class="primary" dark>
              <v-toolbar-title>{{ texts.toolbar }}</v-toolbar-title>
            </v-toolbar>

            <v-card-text>

              <v-form>
                <v-text-field
                  v-if="!isLogin" 
                  prepend-icon="person"
                  name="name"
                  label="Nome"
                  type="text"
                  :error-messages="nameErros"
                  :success="!$v.user.name.$invalid"
                  v-model.trim="$v.user.name.$model"
                ></v-text-field>
                <v-text-field 
                  prepend-icon="email"
                  name="email"
                  label="Email"
                  type="email"
                  :error-messages="emailErros"
                  :success="!$v.user.email.$invalid"
                  v-model.trim="$v.user.email.$model"
                ></v-text-field>
                <v-text-field
                  v-if="!isLogin" 
                  prepend-icon="phone"
                  name="phone"
                  label="Celular"
                  type="text"
                  :error-messages="phoneErros"
                  :success="!$v.user.phone.$invalid"
                  v-model.trim="$v.user.phone.$model"
                ></v-text-field>
                <v-text-field 
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  :error-messages="passwordErros"
                  :success="!$v.user.password.$invalid"
                  v-model.trim="$v.user.password.$model"
                ></v-text-field>
              </v-form>

              <v-btn block depressed color="info" @click="isLogin = !isLogin">{{ texts.button }}</v-btn>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" large :disabled="$v.$invalid" @click="submit">{{ texts.toolbar }}</v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import userService from '@/modules/services/users'

export default {
  name: 'Login',
  data: () => ({
    isLogin: true,
    isMessage: false,
    iconsMessage: '',
    messageLogin: '',
    user: {
      email: '',
      admin: false,
      password: '',
      name: '',
      phone: ''
    }
  }),
  validations(){
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }

    if (this.isLogin) { return validations }

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(5)
        },
        phone: {
          required,
          minLength: minLength(9)
        }
      }
    }
  },
  computed: {
    texts() {
      return this.isLogin 
        ? { toolbar: 'Acesso ADM', button: 'Criar Conta' } 
        : { toolbar: 'Criar Conta', button: 'Já tenho uma conta' } 
    },
    nameErros(){
      const erros = []
      const name = this.$v.user.name

      if (!name.$dirty) { return erros }

      !name.required && erros.push('Nome é obrigatório!')
      !name.minLength && erros.push(`Insira pelo menos ${name.$params.minLength.min} caracteres no nome, pode ser composto!`)

      return erros
    },
    emailErros(){
      const erros = []
      const email = this.$v.user.email

      if (!email.$dirty) { return erros }

      !email.required && erros.push('Email é obrigatório!')
      !email.email && erros.push('Informe um Email válido!')

      return erros
    },
    phoneErros(){
      const erros = []
      const phone = this.$v.user.phone

      if (!phone.$dirty) { return erros }

      !phone.required && erros.push('phone é obrigatório!')
      !phone.minLength && erros.push(`Insira pelo menos ${phone.$params.minLength.min} números!`)

      return erros
    },
    passwordErros(){
      const erros = []
      const password = this.$v.user.password

      if (!password.$dirty) { return erros }

      !password.required && erros.push('password é obrigatório!')
      !password.minLength && erros.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)

      return erros
    }
  },
  methods: {
    submit(){
      if (this.isLogin){
        userService.byEmail(this.user.email)
          .then(response => {
            const result = response.data
            console.log('Access User ->', response.data)
            if (result.serviceMessage.codigoRetorno === 0) {
              this.messageLogin = result.serviceMessage.serviceMessage.mensagem[0].mensagem
              this.iconsMessage = 'success'
              this.isMessage = true
            } else {
              this.messageLogin = result.serviceMessage.serviceMessage.mensagem[0].mensagem
              this.iconsMessage = 'error'
              this.isMessage = true
            }
          })
        
      } else {
        userService.create(this.user)
          .then(response => {
            const result = response.data
            console.log('Save User ->', response.data)
            if (result.serviceMessage.codigoRetorno === 0) {
              this.messageLogin = result.serviceMessage.serviceMessage.mensagem[0].mensagem
              this.iconsMessage = 'success'
              this.isMessage = true
              this.isLogin = false
            } else {
              this.messageLogin = result.serviceMessage.serviceMessage.mensagem[0].mensagem
              this.iconsMessage = 'error'
              this.isMessage = true
            }
          })
          .catch(e => {
            console.log('Error no save', e)
            this.messageLogin = JSON.stringify(e)
            this.iconsMessage = 'error'
            this.isMessage = true
          }) 
        
      }
    }
  }
}
</script>

<style>

</style>