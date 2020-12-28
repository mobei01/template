<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-08-11 14:25:59
 * @LastEditTime: 2020-09-30 11:03:17
-->
<template>
  <div class="about">
    <h1>{{ $t('t.about_page') }}</h1>
    <Button @click="$_onNavBack">{{ $t('t.nav_home') }}</Button>
  </div>
</template>
<script>
export default {
  methods: {
    $_onNavBack() {
      this.$router.back()
    },
  },
}
</script>
