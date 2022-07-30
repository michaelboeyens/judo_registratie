<template>
  <div>
    <MainHeader />
    <main class="content">
      <h2>Inschrijvingsformulier</h2>
      <FormKit
        v-if="!submittedForm"
        type="form"
        :config="{
          classes: {
            input: 'content__form-input',
            fieldset: 'content__form-fieldset',
            wrapper: 'content__form-wrapper',
          },
        }"
        :actions="false"
        @submit="submitHandler"
        #default="{ state: { valid } }"
      >
        <section v-show="pageCounter === 0">
          <FormKit type="group" name="member">
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
              type="checkbox"
              name="gJudoka"
              label="Schrijft u in voor de g-judo groep?"
              :value="false"
            />
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
            <FormKit type="button" label="Volgende" @click="pageCounter = 1" />
          </FormKit>
        </section>
        <section v-show="pageCounter === 1">
          <FormKit type="group" name="family">
            <FormKit
              type="email"
              name="email"
              label="Emailadres"
              validation="required|email"
              placeholder="mijnemailadres@judobazel.be"
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
              placeholder="dorpstraat 1"
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
            <FormKit type="button" label="Vorige" @click="pageCounter = 0" />
          </FormKit>
        </section>
        <FormKit type="submit" label="Inschrijven" :disabled="!valid" />
      </FormKit>
      <p v-else>Uw inschrijvingsformulier is verzonden!</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { memberType } from "@/types";

const pageCounter = ref(0);
const submittedForm = ref(false);

const submitHandler = async (content: memberType) => {
  console.log(content);

  try {
    const { data, error } = await useFetch("/api/form", {
      method: "POST",
      body: content,
    });

    console.log("response: ", data.value);
    if (error.value) {
      console.error("error: ", error.value);
    } else {
      submittedForm.value = true;
    }
  } catch (err) {
    console.error(err);
  }
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
      background-color: var(--form-input-background-color);
    }
    &-wrapper,
    &-fieldset {
      max-width: none;
    }
  }
}
</style>
