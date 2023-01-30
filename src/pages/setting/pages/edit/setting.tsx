export const rules = {
  title: [
    {
      required: true,
      message: '请填写应用名称!',
    },
    {
      max: 8,
      message: '应用名称长度不能超过8',
    }
  ],
  type: [
    {
      required: true,
      message: '请选择应用类目!',
    },
  ],
  intro: [
    {
      required: true,
      message: '请填写应用简介!',
    },
    {
      max: 128,
      message: '应用简介长度不能超过128',
    }
  ],
  icon: [
    {
      required: true,
      message: '请上传应用图标!',
    },
    { 
      message: '只能上传图片文件', 
      validator: (e, value) => {
        return (value?.[0]?.name.includes('.png') || value?.[0]?.name.includes('.jp')) ? Promise.resolve() : Promise.reject() 
      }
    }
  ]
};
