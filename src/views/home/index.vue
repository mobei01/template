<template>
  <div class="home">
    <h1>{{ $t('t.home_page') }}</h1>

    <Button @click="$_onNavTo">{{ $t('t.nav_about') }}</Button>

    <Button @click="$_onChangeLanguage">{{ $t('t.change_lang') }}</Button>
  </div>
</template>

<script>
import i18nManagerInstance from '@/common/i18n'
import mixins from './mixins'
// import { mapActions } from 'vuex'

// 本地存储key
const STORAGE_KEY = 'vue-cli-template-language'
export default {
  name: 'Home',
  mixins: [mixins],
  data: () => ({
    lang: window.localStorage.getItem(STORAGE_KEY),
  }),
  methods: {
    $_onNavTo() {
      this.$router.push({
        name: 'about',
      })
    },
    $_onChangeLanguage() {
      this.lang = this.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
      i18nManagerInstance.loadLanguageAsync(this.lang)
    },
  },
}
</script>

<style lang="scss">
@import './index.scss';
</style>
