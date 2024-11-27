import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-tincyeditor', IndexField)
  app.component('detail-tincyeditor', DetailField)
  app.component('form-tincyeditor', FormField)
})
