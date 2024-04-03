export default {
  common: {
    confirmMessage: {
      confirm: 'Are you sure you want to confirm the record?',
      logout: 'Are you sure you want to log out?',
      save: 'Are you sure you want to save the record?',
      update: 'Are you sure you want to change the record?',
      delete: 'Are you sure you want to delete this record?',
      void: 'Are you sure to void the record',
      endorsed: 'Are you sure to endorsed the record'
    },
    errorMessage: {
      removeRef: 'The record is referred by other data. It cannot be deleted.',
      accessNotAllowed: 'You do not have authorization to access to this part of the AFCTRM System.',
      noOperatingDate: 'No active operating date found',
      system: 'Please contact the server administrator.<br>More information about this error may be available in the server error log.',
      dateFormat: 'The date format is invalid, format should be',
      dupKey: 'The record already exists.',
      notFound: 'No record was found.',
      ReportMaxError: 'The maximum concurrent report jobs limit was reached.  Please try again later.',
      title: 'Internal Server Error'
    },
    label: {
     
    },
    msg: {
      info: {
        createSuccess: 'Create Record Successfully !',
        updateSuccess: 'Update Record Successfully !',
        deleteSuccess: 'Delete Record Successfully !',
        genReportSuccess: 'Report Generation Successfully !',
        startGenerateExportDataSuccess: 'Start Generating Export Data Successfully !',
        startGenerateReportSuccess: 'Start Generating Report Successfully !',
        confirm: {
          error: 'The record is already confirmed !',
          success: 'The record is confirmed successfully !',
          confirm: 'The record is confirm !'
        },
        obsolete: {
          error: 'The record is already obsoleted !',
          success: 'The record is obsolete successfully !',
          obsolete: 'The record is obsolete !'
        }
      },
      alert: {
        createConfirm: 'Are you sure you want to add this record?',
        updateConfirm: 'Are you sure you want to change this record?',
        deleteConfirm: 'Are you sure you want to delete this record?',
        uploadConfirm: 'Are you sure you want to upload this file?',
        genReportConfirm: 'Report will be generated to specified path on file server. You can preview it by clicking "Yes" button.',
        genReportConfirmForReportManager: 'Are you sure you want to generate report?',
        cancelConfirm: 'Are you sure you have submited your changes before you go back to last page?',
        cancel: 'Are you sure you want to go back to last page?',
        generateConfirm: 'Are you sure you want to generate ?',
        NumberLenthOverLong: 'Number is too long for this field .',
        NumberNegative: 'Number should not be negative for this field .',
        copyConfirm: 'Are you sure to copy that column data records?',
        genDataConfirm: 'Are you sure you want to generate data?',
        checkLength: 'Length of this field should not exceed',
        confirmSend: 'Are you sure to send watchlist file?',
        successMessage: 'Report submitted successful.  Report will be sent to your e-mail account',
        saveConfirm: 'Are you sure you want to save this record?'
      },
      noRecord: 'No record was found'
    },
    button: {
      cancel: 'Cancel',
      submit: 'Submit',
      upload: 'Upload',
      addUser: 'Add User',
      save: 'Save',
      update: 'Update',
      delete: 'Delete',
      search: 'Search',
      retrieve: 'Retrieve',
      dDate: 'D Date',
      genDailyReport: 'Daily Report',
      reportSheet: 'Cnt Sheet',
      reject: 'Reject',
      deduce: 'Deduct',
      genReport: 'Report',
      copy: 'Copy',
      ok: 'OK',
      export: 'Export',
      controlReport: 'Control Report',
      downloadTemplate: 'Download Template',
      add: 'Add',
      outStandingReport: 'Outstanding Report',
      new: 'New',
      issue: 'Issue Voucher',
      genTotalReport: 'Generate Total Report',
      edit: 'Edit',
      reportDetail: 'Print Detail',
      confirm: 'Confirm',
      approveConfirm: 'Approve & Confirm',
      listDatesSelected: 'List Dates Selected',
      addDevice: 'Add',
      relocate: 'Relocate',
      sendFile: 'Send File',
      insertAmountTier: 'Insert Amount Tier',
      insertVolumeTier: 'Insert Volume Tier',
      generateReport: 'Generate Report',
      stopAll: 'Stop All',
      killAll: 'Kill All',
      restartAll: 'Restar All',
      create: 'Create',
      command: 'Command',
      send: 'Send',
      processEdit: 'Process Edit',
      commandEdit: 'Cmd Edit',
      return: 'Return',
      updateFloat: 'Update Float',
      addStock: 'Add Stock',
      letter: 'Letter',
      reset: 'Reset',
      invoice: 'Invoice',
      genSumReport: 'Sum Report',
      complete: 'Complete',
      append: 'Append',
      print: 'Print'
    },
    searchResult: {
      noRecord: 'No record was found'
    },
    message: {
      recordError: 'This record has problem, check database please!',
      confirmUpdate: 'Are you sure you want to change this record?',
      confirmInsert: 'Are you sure you want to add this record?',
      confirmRelocate: 'Are you sure you want to relocate this record?',
      recordDuplicated: 'This record already existed',
      confirmDelete: 'Are you sure you want to delete this record?'
    },
    report: {
      format: 'Export Format'
    }
  },
  settings: {
    systemName: 'AFCTRM - Ticket And Revenue Module',
  },
  user: {
    logOutTitle: '',
    logOutMessage: 'Confirm to logout?',
    logOutConfirm: 'Yes',
    logOutCancel: 'No',
    logOutSuccess: 'Exit successfully !',
    title: 'User',
    label: {
      accountId: 'Account Id',
      accountName: 'Account Name',
      accountDesc: 'Description',
      groupAccount: 'Group Account'
    }
  },
  notFound: {
    foundTitle: 'Wrong address input, please re-enter the address',
    foundTitle1: 'Error page',
    foundMsg: 'You can check the web address first, and then re-enter or give us feedback.',
    foundMsg1: 'The page cannot be found! Please contact the administrator !',
    foundBtn: 'Back to page'
  },
  greetings: {
    dawning: 'Good dawning',
    morning: 'Good morning',
    forenoon: 'Good forenoon',
    noon: 'Good noon',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    night: 'Good night'
  },
  required: {
    username: 'The user name should not be blank',
    password: 'The password should not be blank'
  },
  login: {
    account: {
      accountId: 'User Id',
      username: 'User Name',
      password: 'Password',
      confirm: 'Confirm',
      login: 'Login',
      reset: 'Reset'
    },
    tips: 'Login',
    signInText: 'Welcome back !'
  }
}
