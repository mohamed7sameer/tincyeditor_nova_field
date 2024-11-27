# Tincymice Editor For Laravel Nove

```shell
php artisan nova:field mohammed2617/tincyeditor
cd nova-components/tincyeditor
npm run watch
```

Edit resources/js/components/FromField.js

```php
<template>
  <DefaultField
    :field="field"
    :errors="errors"
    :show-help-text="showHelpText"
    :full-width-content="fullWidthContent"
  >
    <template #field>
      <textarea
        :id="field.attribute"
        type="text"
        :class="errorClasses"
        :placeholder="field.name"
        v-model="value"
      ></textarea>
    </template>
  </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'

export default {
  mixins: [FormField, HandlesValidationErrors],

  props: ['resourceName', 'resourceId', 'field'],

  created () {},
  beforeMount () {},
  mounted () {
    this.$nextTick(()=>{
        this.setEditor();
    });
  },
  beforeUpdate () {},
  updated () {},
  beforeUnmount () {
    tinymce.remove("#" + this.field.attribute);
  },
  unmounted () {},


  errorCaptured () {},
  activated () {},
  deactivated () {},
  serverPrefetch () {},


  methods: {
    /*
     * Set the initial, internal value for the field.
     */
    setInitialValue() {
      this.value = this.field.value || ''
    },


    setEditor () {
        const useDarkMode = false ;
        tinymce.init({
          "selector": "#" + this.field.attribute,
          plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
          menubar: 'file edit view insert format tools table help',
          toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          image_advtab: true,
          importcss_append: true,
          height: 600,
          image_caption: true,
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image table',
          skin: useDarkMode ? 'oxide-dark' : 'oxide',
          content_css: useDarkMode ? 'dark' : 'default',
          setup: (editor)=> {
              editor.on('change', ()=> {
                // console.log(editor.getContent())
                editor.save();
                // this.value = editor.getContent();
                this.value = this.field.value = editor.getContent();
                // get the editor value and set it in this.value
              });
            }
      });
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
      formData.append(this.fieldAttribute, this.value || '')
    },
    
  },
}
</script>
```

```shell
cd public
mkdir admin
cd admin
git clone https://github.com/mohamed7sameer/tinymce
```

```php
namespace App\Providers;
class NovaServiceProvider extends NovaApplicationServiceProvider
{
    public function boot()
    {
        parent::boot();
            Nova::remoteScript(asset('admin/tinymce/tinymce.min.js'));
    }
}
```


```php
Tincyeditor::make('description')->hideFromIndex(),
```



