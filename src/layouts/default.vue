<template>
  <SidebarProvider>
    <div class="flex h-screen w-full overflow-hidden">
      <!-- Sidebar -->
      <aside 
        class="relative flex h-full flex-col overflow-hidden border-r bg-sidebar text-sidebar-foreground transition-[width]"
        :class="[
          isCollapsed ? 'w-[var(--sidebar-icon-width)]' : 'w-[var(--sidebar-expanded-width)]'
        ]"
      >
        <!-- Sidebar Header -->
        <div class="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-squares-2x2" class="h-6 w-6" />
            <span 
              class="text-lg font-semibold transition-opacity duration-200"
              :class="{ 'opacity-0': isCollapsed }"
            >
              MRE
            </span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto">
          <ul class="grid gap-1 p-2">
            <!-- Label -->
            <li v-for="item in navigationItems" :key="item.label">
              <!-- Label type -->
              <template v-if="item.type === 'label'">
                <div 
                  class="px-3 py-2 text-xs font-medium text-sidebar-foreground/50"
                  :class="{ 'opacity-0': isCollapsed }"
                >
                  {{ item.label }}
                </div>
              </template>

              <!-- Menu item with children -->
              <template v-else>
                <div>
                  <!-- Parent menu item -->
                  <button
                    class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    @click="toggleMenu(item)"
                  >
                    <div class="flex items-center gap-3">
                      <UIcon :name="item.icon" class="h-4 w-4" />
                      <span 
                        class="transition-opacity duration-200"
                        :class="{ 'opacity-0': isCollapsed }"
                      >
                        {{ item.label }}
                      </span>
                    </div>
                    <UIcon
                      v-if="!isCollapsed"
                      :name="expandedMenus[item.label] ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                      class="h-4 w-4 transition-transform"
                    />
                  </button>

                  <!-- Child menu items -->
                  <ul
                    v-if="item.children && !isCollapsed"
                    v-show="expandedMenus[item.label]"
                    class="mt-1 space-y-1 px-3"
                  >
                    <li v-for="child in item.children" :key="child.label">
                      <NuxtLink
                        :to="child.route"
                        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        :class="{ 'bg-sidebar-accent text-sidebar-accent-foreground': isCurrentRoute(generatePath(item.label, child.label)) }"
                      >
                        <UIcon :name="child.icon" class="h-4 w-4" />
                        <span>{{ child.label }}</span>
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </template>
            </li>
          </ul>
        </nav>

        <!-- Footer -->
        <div class="mt-auto border-t p-4">
          <div class="flex items-center gap-3">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="User"
              class="h-8 w-8"
            />
            <div 
              class="transition-opacity duration-200"
              :class="{ 'opacity-0': isCollapsed }"
            >
              <p class="text-sm font-medium">User Name</p>
              <p class="text-xs text-sidebar-foreground/70">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex h-full flex-1 flex-col overflow-hidden">
        <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <button 
            class="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
            @click="toggleSidebar"
          >
            <UIcon 
              :name="isCollapsed ? 'i-heroicons-bars-3' : 'i-heroicons-bars-3'"
              class="h-5 w-5"
            />
          </button>
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{{ currentPage }}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-4">
          <slot />
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider } from '@/components/ui/sidebar'

// Define which routes should use this layout
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

interface MenuItem {
  label: string
  icon: string
  type?: 'label'
  children?: {
    label: string
    description: string
    icon: string
    route?: string
  }[]
}

const navigationItems = [
  {
    label: 'Links',
    type: 'label',
    icon: ''
  },
  {
    label: 'Estates',
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'Add New',
        description: '',
        icon: 'i-lucide-house'
      },
      {
        label: 'View All',
        description: '',
        icon: 'i-lucide-cloud-download',
        route: '/estates'
      }
    ]
  },
  {
    label: 'Buildings',
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'Add New',
        description: '',
        icon: 'i-lucide-house',
        route: '/buildings'
      },
      {
        label: 'View All',
        description: '',
        icon: 'i-lucide-cloud-download'
      }
    ]
  },
  {
    label: 'Units',
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'Add New',
        description: '',
        icon: 'i-lucide-house',
        route: '/units'
      },
      {
        label: 'View All',
        description: '',
        icon: 'i-lucide-cloud-download'
      }
    ]
  },
  {
    label: 'SubUnits',
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'Add New',
        description: '',
        icon: 'i-lucide-house',
        route: '/subunits'
      },
      {
        label: 'View All',
        description: '',
        icon: 'i-lucide-cloud-download'
      }
    ]
  }
] as MenuItem[]

const expandedMenus = ref<Record<string, boolean>>({})

const toggleMenu = (item: MenuItem) => {
  if (item.children) {
    expandedMenus.value[item.label] = !expandedMenus.value[item.label]
  }
}

const generatePath = (parent: string, child: string) => {
  const slug = (str: string) => str.toLowerCase().replace(/\s+/g, '-')
  return `/${slug(parent)}/${slug(child)}`
}

const isCurrentRoute = (path: string) => route.path === path

const currentPage = computed(() => {
  const paths = route.path.split('/')
  const currentPath = paths[paths.length - 1]
  return currentPath.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
})
</script>

<style>
:root {
  --sidebar-expanded-width: 240px;
  --sidebar-icon-width: 64px;
}

/* Ensure the app takes full height */
html, body, #__nuxt {
  height: 100%;
}
</style> 