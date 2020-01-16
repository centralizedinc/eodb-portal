<template>
  <a-row>
    <a-col :span="24">
      <collection-card></collection-card>
    </a-col>
    <a-col :span="24"></a-col>
  </a-row>
</template>

<script>
import CollectionCard from '@/components/admin/CollectionCard'
export default {
    components:{
        CollectionCard
    }
}
</script>

<style>

</style>