<template>
  <MainHeader />
  <main class="content">
    <h2>Inschrijvingsformulier</h2>
    <FormKit type="form" submit-label="Inschrijven">
      <FormKit
        type="radio"
        label="Type inschrijving"
        :options="['Nieuw lid', 'Bestaand lid']"
      />
      <FormKit type="email" label="Emailadres" />
      <FormKit type="text" label="Voornaam" />
      <FormKit type="text" label="Achternaam" />
      <FormKit type="date" label="Geboortedatum" />
      <FormKit type="text" label="Straat" />
      <FormKit type="text" label="Nummer" />
      <FormKit type="text" label="Postcode" />
      <FormKit type="text" label="Gemeente" />
      <FormKit type="text" label="Gsm/telefoon" />
    </FormKit>
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.content {
  padding: 2rem;
}
</style>
