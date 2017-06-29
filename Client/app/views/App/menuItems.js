export default function(){
    return [
      {
        type : 'link',
        href : '/vision/create',
        text : 'New Vision'
      },
      {
        type : 'action',
        onClick : this.testify,
        text : 'Testify'
      }
    ]
}
