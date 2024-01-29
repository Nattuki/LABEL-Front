<template>
  <v-container>
    <v-card
      class="w-50"
      elevation="4"
      title="平家物語"
      subtitle="作者不詳"
      variant="outlined"
      color="green"
      prepend-icon="mdi-book-open-variant"
    >
        <v-card-text>
            祇園精舎の鐘の声、諸行無常の響きあり。
            娑羅双樹の花の色、盛者必衰の理をあらわす。
            おごれる人も久しからず、唯、春の夜の夢のごとし。
            猛きものもついにはほろびぬ、
            偏に風の前の塵に同じ。
        </v-card-text>
        <v-card-actions>
            <v-btn :variant="'outlined'">源氏を選択</v-btn>
            <v-btn :variant="'outlined'">平家を選択</v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>

</script>