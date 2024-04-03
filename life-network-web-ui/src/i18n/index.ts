import { createI18n } from 'vue-i18n'
import { store } from '@/store'
import ZHCn from '@/i18n/zh-cn'
import ZhHk from '@/i18n/zh-hk'
import EnUs from '@/i18n/en-us'

const messages = {
  'zh-CN': {
    i18n: ZHCn
  },
  'en-US': {
    i18n: EnUs
  },
  'zh-HK': {
    i18n: ZhHk
  }
}

export default createI18n({
  locale: store.state.appConfigModule.globalI18n,
  messages: messages
})
