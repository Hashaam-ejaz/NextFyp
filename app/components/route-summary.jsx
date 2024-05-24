function RouteSummary({ category, subCategory }) {
  return (
    <div className="bg-white mt-8 ml-16">
      <span>
        <a>Categories &nbsp; </a>
        {" / "} <a className="font-semibold"> &nbsp; {category}</a>
        {" / "}{" "}
        <a
          className="font-semibold"
          href={`/search/categoryName=${subCategory}&query=Enter%20Search...`}
        >
          {" "}
          &nbsp; {subCategory}
        </a>
      </span>
    </div>
  );
}
export default RouteSummary;
