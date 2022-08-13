<template>
  <div>
    <MainHeader />
    <main class="content">
      <div class="content__progress">
        <div
          v-for="item in 3"
          class="content__pageindicator"
          :class="{ 'content__pageindicator--active': item <= pageCounter + 1 }"
          :key="`pageindicator-${item}`"
        />
      </div>
      <h2>Inschrijvingsformulier</h2>
      <p v-if="!submittedForm">*: verplichte velden</p>
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
                label="Type inschrijving *"
                :options="{ newMember: 'Nieuw lid', oldMember: 'Bestaand lid' }"
                validation="+required"
                name="registrationType"
                :validation-messages="{ required: 'Bent u al een lid?' }"
              />
            </ClientOnly>
            <FormKit
              type="text"
              name="firstName"
              label="Voornaam *"
              validation="required"
              placeholder="Jan"
              :validation-messages="{
                required: 'Wat is uw voornaam?',
              }"
            />
            <FormKit
              type="text"
              name="lastName"
              label="Achternaam *"
              validation="required"
              placeholder="Vermeulen"
              :validation-messages="{
                required: 'Wat is uw achternaam?',
              }"
            />
            <FormKit
              type="date"
              name="birthDate"
              label="Geboortedatum *"
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
            <FormKit
              type="button"
              label="Volgende"
              @click="pageCounter = 1"
              :classes="{ wrapper: 'content__pagebuttons--rightalign' }"
            />
          </FormKit>
        </section>
        <section v-show="pageCounter === 1">
          <FormKit type="group" name="family">
            <FormKit
              type="email"
              name="email"
              label="Emailadres *"
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
              label="Gsm/telefoon *"
              validation="required"
              placeholder="031234567"
              :validation-messages="{
                required: 'Wat is uw telefoon/gsm nummer?',
              }"
            />
            <FormKit
              type="text"
              name="streetName"
              label="Straat *"
              validation="required"
              placeholder="dorpstraat 1"
              :validation-messages="{ required: 'In welke straat woont u' }"
            />
            <FormKit
              type="text"
              label="Postcode *"
              name="postalCode"
              validation="required|number|length:4,4"
              placeholder="9150"
              minlength="4"
              maxlength="4"
              :validation-messages="{
                required: 'Wat is uw postcode?',
                number: 'De postcode moet een nummer zijn.',
                length: 'De postcode moet 4 cijfers lang zijn.',
              }"
            />
            <FormKit
              type="text"
              name="city"
              label="Gemeente *"
              validation="required"
              placeholder="Bazel"
              :validation-messages="{ required: 'In welke gemeente woont u?' }"
            />
            <div class="content__pagebuttons--both">
              <FormKit type="button" label="Vorige" @click="pageCounter = 0" />
              <FormKit
                type="button"
                label="Volgende"
                @click="pageCounter = 2"
              />
            </div>
          </FormKit>
        </section>
        <section v-show="pageCounter === 2">
          <FormKit type="group" name="additionalInfo">
            <FormKit
              type="checkbox"
              name="additionalOptions"
              :options="{
                thirdMember:
                  'Zijn er 3 leden of meer van uw familie lid van de club?',
                gJudoka: 'Schrijft u in voor de g-judo groep?',
              }"
              label="Aanvullende vragen"
              :value="false"
            />
            <ClientOnly>
              <FormKit
                type="select"
                label="Bent u ermee akkoord dat foto's van u/uw kind op facebook/instagram verschijnen? *"
                :options="{
                  yes: 'Ja, ik ben hiermee akkoord',
                  no: 'Nee, ik ben hier niet mee akkoord',
                }"
                placeholder="Bent u hiermee akkoord?"
                name="socialMediaAgreement"
                validation="required"
                :validation-messages="{
                  required:
                    'Gelieve aan te duiden of u hiermee akkoord bent of niet.',
                }"
              />
            </ClientOnly>
          </FormKit>
          <FormKit
            type="button"
            label="Vorige"
            @click="pageCounter = 1"
            :classes="{ wrapper: 'content__pagebuttons--leftalign' }"
          />
        </section>
        <FormKit
          type="submit"
          label="Inschrijven"
          :disabled="!valid"
          :classes="{ outer: 'content__submit' }"
        />
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
  &__pagebuttons {
    &--leftalign,
    &--rightalign,
    &--both {
      display: flex;
      gap: 5rem;
    }
    &--leftalign {
      justify-content: flex-start;
    }
    &--rightalign {
      justify-content: flex-end;
    }
    &--both {
      justify-content: space-between;
    }
  }
  &__submit {
    margin-top: 2rem;
  }
  &__progress {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  &__pageindicator {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: hsl(0, 0%, 50%);
    &--active {
      background-color: hsl(3, 66%, 39%);
    }
  }
}
</style>
