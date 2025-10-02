// styles.js to contain style strings for easier styling

export const layout = {
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    section: "py-4 md:py-16",
    centeredFlex: "flex items-center justify-center",
    // betweenFlex: "flex items-center justify-between w-full",
    betweenFlex: "flex flex-col sm:flex-row items-center justify-between w-full",
}


export const cards = {
  // base: "p-4 border border-gray-200 rounded-lg shadow-sm bg-white", Not using anymore.
  container: "grow border-solid border-2 border-(--cardLightBorder) rounded p-3 w-sm", 
  description:"text-center sm:text-left",
  title:'text-xl text-(--primary) font-bold',
  titleContainer:'flex justify-center items-center gap-2 sm:justify-start',
};

export const typography = {
  heading1: "text-4xl md:text-5xl font-bold text-(--textPrimary)",
  heading2: "text-2xl md:text-3xl font-semibold text-(--textPrimary)",
  // paragraph: "text-base md:text-lg text-(--textSecondary)",
  paragraph: "text-lg text-(--textSecondary)",
  link: "text-blue-600 hover:underline",
};

/* Headings and fonts */
export const primaryHeading = "md:text-4xl font-bold text-(--primary) text-2xl";
export const sectionContainer = 0;
export const secondaryHeading = 0;
export const sectionHeading = 0;