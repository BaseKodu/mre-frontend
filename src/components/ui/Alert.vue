<script setup lang="js">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['error', 'warning', 'info', 'success', 'custom'].includes(value),
  },
  icon: {
    type: String,
    default: '', // Allow override
  },
  color: {
    type: String,
    default: '', // Allow override
  },
  variant: {
    type: String,
    default: 'soft', // 'solid', 'outline', 'soft', 'ghost'
  },
  closable: {
    type: Boolean,
    default: true,
  },
  timeout: {
    type: Number,
    default: 0, // Auto-close after milliseconds (0 = no auto-close)
  },
  actions: {
    type: Array, // Array of { label, handler } for buttons
    default: () => [],
  },
});

const emit = defineEmits(['close']);

const computedIcon = computed(() => {
  if (props.icon) return props.icon; // Allow manual override
  switch (props.type) {
    case 'error': return 'i-lucide-ban';
    case 'warning': return 'i-lucide-alert-circle';
    case 'info': return 'i-lucide-info';
    case 'success': return 'i-lucide-check-circle';
    default: return 'i-lucide-info';
  }
});

const computedColor = computed(() => {
  if (props.color) return props.color; // Allow manual override
  return props.type === 'custom' ? 'gray' : props.type;
});

// Auto-close if timeout is set
onMounted(() => {
  if (props.timeout > 0) {
    setTimeout(() => emit('close'), props.timeout);
  }
});
</script>

<template>
  <UAlert
    :title="title"
    :description="message"
    :icon="computedIcon"
    :color="computedColor"
    :variant="variant"
    :close-button="closable ? undefined : null"
    @close="$emit('close')"
  >
    <!-- Custom action buttons -->
    <template v-if="actions.length" #actions>
      <UButton
        v-for="(action, index) in actions" :key="index"
        :label="action.label"
        :color="variant === 'solid' ? 'white' : computedColor"
        :variant="variant === 'solid' ? 'ghost' : 'soft'"
        size="xs"
        @click="action.handler"
        
      />
    </template>
  </UAlert>
</template>