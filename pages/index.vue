<template>
  <div>
    <MainHeader />
    <main class="content">
      <h2>Inschrijvingsformulier</h2>
      <FormKit
        type="form"
        :config="{
          classes: {
            input: 'content__form-input',
            fieldset: 'content__form-fieldset',
            wrapper: 'content__form-wrapper',
          },
        }"
        submit-label="Inschrijven"
        @submit="submitHandler"
      >
        <FormKit type="group" name="member" v-model="memberData">
          <ClientOnly>
            <FormKit
              type="select"
              placeholder="Selecteer het type inschrijving"
              label="Type inschrijving"
              :options="{ newMember: 'Nieuw lid', oldMember: 'Bestaand lid' }"
              validation="+required"
              name="registrationType"
              :validation-messages="{ required: 'Bent u al een lid?' }"
            />
          </ClientOnly>
          <FormKit
            type="text"
            name="firstName"
            label="Voornaam"
            validation="required"
            placeholder="Jan"
            :validation-messages="{
              required: 'Wat is uw voornaam?',
            }"
          />
          <FormKit
            type="text"
            name="lastName"
            label="Achternaam"
            validation="required"
            placeholder="Vermeulen"
            :validation-messages="{
              required: 'Wat is uw achternaam?',
            }"
          />
          <FormKit
            type="date"
            name="birthDate"
            label="Geboortedatum"
            validation="required"
            :validation-messages="{ required: 'Wat is uw geboortedatum?' }"
          />
          <FormKit
            type="textarea"
            name="other"
            label="Andere gegevens"
            rows="10"
            placeholder="Hier kan je andere gegevens plaatsen die mogelijk belangrijk zijn voor de trainers"
          />
        </FormKit>
        <FormKit type="group" name="family" v-model="familyData">
          <FormKit
            type="email"
            name="email"
            label="Emailadres"
            validation="required|email"
            placeholder="mijnemailnaam@judobazel.be"
            :validation-messages="{
              required: 'Wat is uw emailadres?',
              email: 'Gelieve een geldig emailadres op te geven',
            }"
          />
          <FormKit
            type="text"
            name="phone"
            label="Gsm/telefoon"
            validation="required"
            :validation-messages="{
              required: 'Wat is uw telefoon/gsm nummer?',
            }"
          />
          <FormKit
            type="text"
            name="streetName"
            label="Straat"
            validation="required"
            placeholder="dorpstraat"
            :validation-messages="{ required: 'In welke straat woont u' }"
          />
          <FormKit
            type="text"
            label="Postcode"
            name="postalCode"
            validation="required|number|length:4,4"
            placeholder="9150"
            :validation-messages="{
              required: 'Wat is uw postcode?',
              number: 'De postcode moet een nummer zijn.',
              length: 'De postcode moet 4 cijfers lang zijn.',
            }"
          />
          <FormKit
            type="text"
            name="city"
            label="Gemeente"
            validation="required"
            placeholder="Bazel"
            :validation-messages="{ required: 'In welke gemeente woont u?' }"
          />
        </FormKit>
      </FormKit>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { memberType } from "@/types";

const memberData = ref({});
const familyData = ref({});

const submitHandler = (content: memberType) => {
  console.log(content);
};
</script>

<style lang="scss">
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  &__form {
    &-input,
    &-fieldset {
      background-color: var(--white);
    }
    &-wrapper,
    &-fieldset {
      max-width: none;
    }
  }
}
</style>
