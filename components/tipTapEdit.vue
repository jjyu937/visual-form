<template>
  <div v-if="editor" class="control-group">
    <div class="button-group">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        Bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        Italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }">
        Strike
      </button>
      <button @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        Code
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        Clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        Clear nodes
      </button>
      <button @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }">
        Paragraph
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        H3
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        H4
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        H5
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        H6
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        Bullet list
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        Ordered list
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        Code block
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        Blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        Horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        Hard break
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        Undo
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        Redo
      </button>
    </div>
  </div>
  <div>
    <div class="i-ph:microsoft-word-logo-bold w-40px h-40px cursor-pointer" @click="uploadFile"></div>
    <input v-show="false" type="file" id="uploadDocx" accept=".docx" @change="fileChange" />
  </div>
  <editor-content :editor="editor" />
  <div id="output"></div>
</template>

<script setup lang="ts">
import vueComponent from '@/utils/tipTapComponentExtension'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import { renderAsync } from 'docx-preview'

const editor = ref<any>()
const content = ref<string>(`
        <h2>
          Hi there!
        </h2>
        <p>test custom component</p>
        <vue-component></vue-component>
        <p>
          this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>

                <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>

        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `)

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  editor.value.destroy()
})

const initEditor = () => {
  editor.value = new Editor({
    content: content.value,
    extensions: [
      StarterKit,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      vueComponent,
      // TextStyle.configure({ types: [ListItem.name] })
    ],
    editorProps: {
      attributes: {
        class: 'custom-editor'
      }
    },
    onUpdate({ editor }) {
      console.log(editor.getHTML());
    },
  })
}


const uploadFile = () => {
  const _dom = document.querySelector('#uploadDocx') as HTMLElement
  _dom.click()
}

const fileChange = (event: any) => {
  // console.dir(event.target.files[0]);
  if (!event.target.files[0]) return
  readFile(event.target.files[0])
}

const readFile = (file: any) => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = function (event: any) {
    const _dom = document.querySelector('#output') as HTMLElement
    renderAsync(event.target.result, _dom).then((res) => {
      // console.log(res); 
      const _d = document.querySelector('.docx-wrapper') as HTMLElement
      // content.value = matchComponent(_d.innerHTML)
      // console.dir(_d.innerHTML);
      // editor.value.commands.setContent(content.value)

      // todo 曲线救国,  应该将word文档读取成html 后,需要将自定义组件 外包围的元素删除
      editor.value.commands.setContent(_d.innerHTML)
      setTimeout(() => {
        editor.value.commands.setContent(matchComponent(editor.value.getHTML()))
      }, 200)
      // editor.value.destroy()
      // initEditor()
    })
  };
}

const matchComponent = (html: string) => {
  const _matchList = html.match(/{{(.*?)}}/g) || []
  // const _matchList = html.match(/{{(.*?)}}/)
  // console.log(_matchList);
  let newHtml = html
  for (const item of _matchList) {
    // console.log(item);
    newHtml = html.replaceAll(`<p><strong>${item}</strong></p>`, '<vue-component count="0"></vue-component>')
  }
  // newHtml = '<vue-component count="0"></vue-component>' + newHtml
  console.log(newHtml);

  return newHtml
}

</script>

<style scoped>
/* Table-specific styling */
:deep(table) {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

:deep(td, th) {
  border: 1px solid rgba(61, 37, 20, .15);
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

:deep(th) {
  border: 1px solid rgba(61, 37, 20, .15);
  background-color: rgba(124, 255, 216, 0.15);
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
  font-weight: bold;
  text-align: left;
}

:deep(.selectedCell:after) {
  background: rgba(61, 37, 20, .08);
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.tableWrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
}

:deep(pre) {
  background: #0d0d0d;
  color: #fff;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

:deep(.ProseMirror-focused:focus-visible) {
  outline: none;
}

:deep(.custom-editor) {
  padding: 15px;
  height: 600px;
  border: 1px solid rgba(61, 37, 20, 0.35);
  overflow-y: auto;
}

.is-active {
  background-color: aquamarine;
}
</style>