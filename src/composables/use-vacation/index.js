import { useResponsiveLeftSidebar } from "@core/composable/useResponsiveSidebar";
import { blankEvent, useCalendar } from "../../views/apps/calendar/useCalendar";
import { useCalendarStore } from "../../views/apps/calendar/useCalendarStore";

export function useVacation() {
  const store = useCalendarStore();

  // 👉 Check all
  const checkAll = computed({
    get: () =>
      store.selectedCalendars.length === store.availableCalendars.length,
    set: (val) => {
      if (val)
        store.selectedCalendars = store.availableCalendars.map((i) => i.label);
      else if (
        store.selectedCalendars.length === store.availableCalendars.length
      )
        store.selectedCalendars = [];
    },
  });

  // 👉 Event
  const event = ref(structuredClone(blankEvent));
  const isEventHandlerSidebarActive = ref(false);

  return {
    checkAll,
    event,
    isEventHandlerSidebarActive,
  };
}
