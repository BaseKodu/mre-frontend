<script setup>
import { ref, h, resolveComponent } from 'vue'
import { getPaginationRowModel } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const table = useTemplateRef('table')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UBadge = resolveComponent('UBadge')

// Sample data
const properties = ref([
  {
    id: 1,
    name: 'Luxury Villa',
    address: '123 Ocean View Drive',
    numBathrooms: 3,
    numBedrooms: 4
  },
  {
    id: 2,
    name: 'City Apartment',
    address: '456 Downtown Street',
    numBathrooms: 2,
    numBedrooms: 2
  },
  {
    id: 3,
    name: 'Suburban House',
    address: '789 Maple Avenue',
    numBathrooms: 2.5,
    numBedrooms: 3
  },
  {
    id: 4,
    name: 'Beach Cottage',
    address: '321 Seaside Boulevard',
    numBathrooms: 1,
    numBedrooms: 2
  },
  {
    id: 5,
    name: 'Mountain Retreat',
    address: '654 Pine Ridge Road',
    numBathrooms: 3,
    numBedrooms: 4
  },
  {
    id: 6,
    name: 'Luxury Villa',
    address: '123 Ocean View Drive',
    numBathrooms: 3,
    numBedrooms: 4
  },
  {
    id: 7,
    name: 'City Apartment',
    address: '456 Downtown Street',
    numBathrooms: 2,
    numBedrooms: 2
  },
  {
    id: 8,
    name: 'Suburban House',
    address: '789 Maple Avenue',
    numBathrooms: 2.5,
    numBedrooms: 3
  },
  {
    id: 9,
    name: 'Beach Verander',
    address: '321 Ocean Boulevard',
    numBathrooms: 99,
    numBedrooms: 99
  },
  {
    id: 10,
    name: 'Mountain Retreat',
    address: '654 Pine Ridge Road',
    numBathrooms: 3,
    numBedrooms: 4
  }
])

// Table state
const loading = ref(true)
const searchQuery = ref('')

// Column definitions
const columns = [
  {
    accessorKey: 'name',
    header: 'Property Name',
    //sortable: true
  },
  {
    accessorKey: 'address',
    header: 'Address',
    //sortable: true
  },
  {
    accessorKey: 'numBathrooms',
    header: 'Bathrooms',
    //sortable: true
  },
  {
    accessorKey: 'numBedrooms',
    header: 'Bedrooms',
    //sortable: true
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: actionItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
    )
    }
  }
]

// Row actions
const actionItems = (row) => [
  {
    label: 'View Details',
    icon: 'i-heroicons-eye',
    click: () => handleViewDetails(row)
  },
  {
    label: 'Edit',
    icon: 'i-heroicons-pencil',
    click: () => handleEdit(row)
  },
  {
    label: 'Delete',
    icon: 'i-heroicons-trash',
    click: () => handleDelete(row)
  }
]

// Action handlers
const handleViewDetails = (property) => {
  console.log('View details:', property)
}

const handleEdit = (property) => {
  console.log('Edit property:', property)
}

const handleDelete = (property) => {
  console.log('Delete property:', property)
}

// Sorting handler
const sortTable = (sort) => {
  console.log('Sort changed:', sort)
}

// pagination

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})

// table design
function rowClass(row, index) {
  return index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
}


// filtering
const globalFilter = ref('')

</script> 

<template>
  <div class="w-full bg-background ">
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" class="max-w-sm" placeholder="Filter..." />
    </div>
    <UTable
      sticky
      ref="table"
      v-model:pagination="pagination"
      v-model:global-filter="globalFilter"
      :data="properties"
      :columns="columns"
      :loading="loading"
      loading-color="info" 
      loading-animation="swing"
      :empty-state="{ icon: 'i-heroicons-home', label: 'No properties found' }"
      :sort="{ column: 'name', direction: 'asc' }"
      :search-value="searchQuery"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
      :tr-class="rowClass"
      :ui="{
        td: {
          padding: 'px-4 py-1'
        }
      }"

      class="flex-1"
      @update:sort="sortTable"
      
      
    />
          <!-- TODO: Come back to handle the zebra stripe and row height -->

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>