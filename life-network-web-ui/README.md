## Preorder reserve

You need to install it locally [node](http://nodejs.org/) and [git](https://git-scm.com/). The project technology stack is based on [typescript](https://www.typescriptlang.org/)、[vue3](https://v3.cn.vuejs.org/)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios)、[vite](https://github.com/vitejs/vite) and [element-ui](https://github.com/element-plus/element-plus).

## Directory structure

```bash
├── public                     # Static resource
│   │── favicon.ico            # favicon icon
├── src                        # Source code
│   ├── api                    # All requests
│   ├── assets                 # Static resources such as theme fonts
│   ├── components             # Global component
│   ├── icons                  # svg icon
│   ├── i18n                   # multilingual
│   ├── layout                 # Global layout
│   ├── router                 # router
│   ├── store                  # Global vuex store
│   ├── styles                 # Global style
│   ├── utils                  # Global method
│   ├── views                  # ALL Page
│   ├── App.vue                # Entry page
│   ├── main.ts                # Entry file load component initialization, etc
│   └── env.d.ts               # Module injection
├── .eslintrc.js               # eslint disposition
├── package.json               # package.json Depend on
├── tsconfig.json              # typescript disposition
├── tsconfig.node.json         # typescript Import vite configuration
└── vite.config.ts             # vite configuration
```

## How do I set up and start a project

### Installation dependency

```bash
yarn install
```

### Start the local development environment

```bash
yarn dev
```

### Build a production environment

```bash
yarn build
```
