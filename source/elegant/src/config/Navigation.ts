import { NavigationSection } from '@/types/Navigation';

/**
 * The configuration for the documentation sidebar navigation.
 */
export const documentationNav: NavigationSection[] = [
  {
    title: "Prologue",
    links: [
      {
        title: "Release Notes",
        href: "/docs/release-notes"
      },
      {
        title: "Upgrade Guide",
        href: "/docs/upgrade"
      },
      {
        title: "Contribution Guide",
        href: "/docs/contribution-guide"
      }
    ]
  },
  {
    title: "Getting Started",
    links: [
      {
        title: "Installation",
        href: "/docs/installation"
      },
      {
        title: "Configuration",
        href: "/docs/configuration"
      },
      {
        title: "New Documents",
        href: "/docs/new-documents"
      },
      {
        title: "Deployment",
        href: "/docs/deployment"
      }
    ]
  },
  {
    title: "Customization",
    links: [{
      title: "Theme",
      href: "/docs/theme"
    }]
  },
  {
    title: "Plugins",
    links: [
      {
        title: "ConvertKit",
        href: "/docs/convertkit"
      },
      {
        title: "Google Analytics",
        href: "/docs/google-analytics"
      }
    ]
  }
];