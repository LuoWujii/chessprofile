export function rdClass(rd: any) {
  if (rd > 0 && rd <= 50) {
    return {
      class: 'text-green-400',
      label: `Rating Deviation (RD): Lower is better. Shows how confident the system is about your rating.\n\nCurrent status: Good (Stable rating) `,
    }
  } else if (rd >= 51 && rd <= 99) {
    return {
      class: 'text-orange-400',
      label: `Rating Deviation (RD): Lower is better. Shows how confident the system is about your rating.\n\nCurrent status: Moderate (Rating still adjusting) `,
    }
  } else {
    return {
      class: 'text-red-500',
      label: `Rating Deviation (RD): Lower is better. Shows how confident the system is about your rating.\n\nCurrent status: Unstable (Rating not reliable yet) `,
    }
  }
}
