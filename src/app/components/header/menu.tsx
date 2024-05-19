export type Menu = {
  children?: React.ReactNode;
};

export async function Menu({ children }: Menu) {
  return (
    <>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {children}
      </nav>
    </>
  );
}
