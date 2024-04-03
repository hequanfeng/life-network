import { store } from '@/store'
export default (app: any) => {
  app.directive('permit-click', {
    mounted(el: any, binding: any) {
      let screenButtonRole = store.state.userInfosModule.screenButtonRole
      if(binding.value.roleNameArray){
        let isDisabled = false;
        for(let i=0;i< binding.value.roleNameArray.length;i++){
          let roleName = binding.value.roleNameArray[i].replace(/\s*/g, '')
          if (screenButtonRole[roleName]) {
            isDisabled=false;
          }else{
            isDisabled=true;
          }
        }
        if(isDisabled){
          el.disabled = 'disabled'
          el.classList.add('is-disabled')
          el.classList.add('displayNone')
        }
      }else{
      let roleName = binding.value.roleName.replace(/\s*/g, '')

      if (!screenButtonRole[roleName]) {
        el.disabled = 'disabled'
        el.classList.add('is-disabled')
        el.classList.add('displayNone')
      }
    }
    }
  })
}
