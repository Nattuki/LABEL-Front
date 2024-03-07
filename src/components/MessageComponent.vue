<template>
  <v-card>
    <v-card-title>
      こっそりした転調
    </v-card-title>
    <v-divider  thickness="2" class="mx-3 border-opacity-25"></v-divider>

    <v-container>
      <v-row class="text-center">
        <v-col>
        <iframe 
          ref="embed" 
          src="https://www.youtube.com/embed/rH0FDv_qhsI"
          width="350" 
          height="200" 
          title="YouTube video player" 
          frameborder="0" 
          allow="clipboard-write; encrypted-media">
        </iframe>
      </v-col>
      <v-col>
        sedw
      </v-col>
      </v-row>
    </v-container>
        <v-slide-group
          show-arrows
        >
          <v-slide-group-item
            v-for="n in 10"
            :key="n"
          >
            <v-card
              class="mx-3 mb-4"
              color="grey-lighten-1"
              height="100"
              width="150"
            >
            </v-card>
          </v-slide-group-item>
        </v-slide-group>

  </v-card>
</template>

<script lang="ts" setup>
import LabelComponent from './LabelComponent.vue'
import useGetLabelIds from '../composables/useGetLabelIds'
import type { MessageId } from '../types/entity-ids'


</script>

<style lang="scss" module>
.icon{
  height:35px;
  width:35px;
  border-radius: 50%;
  margin-right:10px;
}

</style>