import findandreplacedomtext from "findandreplacedomtext";
import RoleInterface from "src/schema/role/role.interface";
import tippy from "tippy.js";
var time = 1;
export const roleTootip = (role: RoleInterface) => {
  console.log(time++ + "次");
  const finder = findandreplacedomtext(document.getElementById("editorjs"), {
    find: new RegExp(role.name, "g"),
    wrap: "a",
    wrapClass: "role-name",
    portionMode: "first",
  });
  console.log(finder);
  const totoElements = document.querySelectorAll(".role-name");
  Array.from(totoElements).map(cur => {
    console.log(cur.className);
    console.log(cur.classList);
    console.log(cur.classList.length);
    if (cur.classList.length === 1) {
      tippy(cur, {
        arrow: true,
        theme: "light",
        allowHTML: true,
        // placement: "bottom",
        content: `
                <div>
                  <ul>
                    <li>
                      人物姓名：  ${role.name}
                    </li>
                    <li>
                      人物别名：  ${role.alias}
                    </li>
                    <li>
                      人物身份：  ${role.identity}
                    </li>
                    <li>
                      人物关系：  ${role.relationships}
                    </li>
                    <li>
                      人物的基本设定：  ${role.basicSettings}
                    </li>
                    <li>
                      人物的主要经历：  ${role.experience}
                    </li>
                  </ul>  
                </div>
                `,
      });
    }
  });
  //   const elements = document.querySelectorAll('.role-name')
  Array.from(totoElements).map(cur => cur.classList.add("tiped"));
};
