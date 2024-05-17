function RouteSummary({ category, subCategory }) {
  return (
    <div className="bg-white mt-8 ml-16">
      <span>
        <a href="#">Categories &nbsp; </a>
        {" / "}{" "}
        <a className="font-semibold" href="#">
          {" "}
          &nbsp; {category}
        </a>
        {" / "}{" "}
        <a className="font-semibold" href="#">
          {" "}
          &nbsp; {subCategory}
        </a>
      </span>
    </div>
  );
}
export default RouteSummary;
