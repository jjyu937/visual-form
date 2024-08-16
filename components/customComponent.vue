<template>
    <node-view-wrapper class="vue-component">
        <div class="content">
            <button @click="increase">
                This button has been clicked {{ count }} times.
            </button>
            <input class="bg-red" />
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const count = ref(-1)

const props = defineProps({
    ...nodeViewProps
})
console.log('接收到的defineProps', props);
console.log(props.node.attrs);

if (props.node.attrs) {
    count.value = props.node.attrs.count
}

const increase = () => {
    count.value++
}

</script>
<style scoped></style>