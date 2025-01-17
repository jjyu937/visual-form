import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import customComponent from '~/components/customComponent.vue'

export default Node.create({
    name: 'custom-vue',
    group: 'block',
    atom: true,
    addAttributes() {
        return {
            count: {
                default: 0,
            },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'vue-component',
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['vue-component', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(customComponent)
    },
})