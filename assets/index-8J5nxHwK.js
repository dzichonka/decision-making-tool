var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function createElement(options) {
  const { tag, text = "", children, parent, classes = [], id, attributes, style } = options;
  let element = document.createElement(tag);
  element = document.createElement(tag);
  element.textContent = text;
  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        element.append(document.createTextNode(child));
      } else {
        element.append(child);
      }
    });
  }
  if (parent) {
    if (typeof parent === "string") {
      const parentElement = document.querySelector(parent);
      if (parentElement instanceof HTMLElement) {
        parentElement.append(element);
      } else {
        console.error(`Parent selector "${parent}" did not match any element.`);
      }
    } else if (parent instanceof HTMLElement) {
      parent.append(element);
    } else {
      console.error("Parent is not a valid HTML element:", parent);
    }
  }
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  if (id) {
    element.id = id;
  }
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (key in element) {
        element[key] = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }
  if (style) {
    element.style.cssText = style;
  }
  return element;
}
function elemNI(params) {
  const { text, tag, parent, classes = [] } = params;
  const elem = createElement({
    text,
    tag,
    parent,
    classes
  });
  return elem;
}
function h1(parent) {
  const elem = elemNI({
    text: "Decision Making Tool",
    tag: "h1",
    parent,
    classes: ["h1"]
  });
  return elem;
}
const appState = /* @__PURE__ */ (() => {
  const state = {
    id: 0,
    spinTime: 5e3,
    wheelColors: [],
    todos: [{ id: "#1", title: "", weight: "" }]
  };
  return {
    setState: (key, value) => {
      state[key] = value;
    },
    setAllState: (newState) => {
      Object.entries(newState).forEach(([key, value]) => {
        if (key in state) {
          state[key] = value;
        }
      });
    },
    getState: (key) => state[key],
    getAllState: () => ({ ...state }),
    addTodo: (todo) => {
      state.todos.push(todo);
    },
    removeTodo: (id) => {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    updateTodo: (id, newData) => {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        Object.assign(todo, newData);
      }
    }
  };
})();
function setLS(key, value) {
  const data = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(key, data);
}
function getLS(key) {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    return null;
  }
  if (storedValue.startsWith("{") && storedValue.endsWith("}") || storedValue.startsWith("[") && storedValue.endsWith("]")) {
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error("JSON parse error:", error);
      return null;
    }
  }
  return storedValue;
}
function clearLS(key) {
  localStorage.removeItem(key);
}
class EventEmitter {
  constructor() {
    __publicField(this, "events");
    __publicField(this, "wrappers");
    this.events = /* @__PURE__ */ new Map();
    this.wrappers = /* @__PURE__ */ new Map();
  }
  on(name, fn) {
    const event = this.events.get(name);
    if (event) {
      event.add(fn);
    } else {
      this.events.set(name, /* @__PURE__ */ new Set([fn]));
    }
  }
  once(name, fn) {
    const wrapper = (...args) => {
      this.remove(name, wrapper);
      fn(...args);
    };
    this.wrappers.set(fn, wrapper);
    this.on(name, wrapper);
  }
  emit(name, ...args) {
    const event = this.events.get(name);
    if (!event) return;
    for (const fn of event.values()) {
      fn(...args);
    }
  }
  remove(name, fn) {
    const event = this.events.get(name);
    if (!event) return;
    if (event.has(fn)) {
      event.delete(fn);
      return;
    }
    const wrapper = this.wrappers.get(fn);
    if (wrapper) {
      event.delete(wrapper);
      if (event.size === 0) this.events.delete(name);
    }
  }
  clear(name) {
    if (name) {
      this.events.delete(name);
    } else {
      this.events.clear();
    }
  }
  count(name) {
    const event = this.events.get(name);
    return event ? event.size : 0;
  }
  listeners(name) {
    const event = this.events.get(name);
    return new Set(event);
  }
  names() {
    return [...this.events.keys()];
  }
}
const eventEmitter = new EventEmitter();
function inputText() {
  eventEmitter.on(
    "inputText",
    ({ inputElem, id, item }) => {
      const todos = appState.getState("todos");
      const updatedTodos = todos.map((todo) => todo.id === id ? { ...todo, [item]: inputElem.value } : todo);
      appState.setState("todos", updatedTodos);
      const optionsList = appState.getState("todos");
      setLS("optionsList", optionsList);
    }
  );
}
function deleteOption() {
  eventEmitter.on("deleteOption", ({ id, parent }) => {
    const todos = appState.getState("todos");
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    appState.setState("todos", updatedTodos);
    setLS("optionsList", updatedTodos);
    parent.remove();
  });
}
function option({ parent, id, title = "", weight = "" }) {
  const itemToDo = createElement({
    tag: "li",
    parent,
    classes: ["todo__item", "todo-item"]
  });
  createElement({
    tag: "label",
    parent: itemToDo,
    classes: ["todo-item__label", "btn"],
    attributes: { for: id, innerText: id },
    text: id
  });
  inputText();
  const optionTitle = createElement({
    tag: "input",
    parent: itemToDo,
    classes: ["todo-item__input-title"],
    id,
    attributes: {
      type: "text",
      name: "title",
      placeholder: "Title",
      value: title
    }
  });
  optionTitle.addEventListener(
    "input",
    () => eventEmitter.emit("inputText", {
      inputElem: optionTitle,
      id,
      item: "title"
    })
  );
  const optionWeight = createElement({
    tag: "input",
    parent: itemToDo,
    classes: ["todo-item__input-weight"],
    attributes: {
      type: "number",
      name: "weight",
      placeholder: "Weight",
      value: weight
    }
  });
  optionWeight.addEventListener(
    "input",
    () => eventEmitter.emit("inputText", {
      inputElem: optionWeight,
      id,
      item: "weight"
    })
  );
  const delBtn = createElement({
    text: "Delete",
    tag: "div",
    parent: itemToDo,
    classes: ["btn-del", "btn", "btn_clickable"]
  });
  deleteOption();
  delBtn.addEventListener("click", () => {
    eventEmitter.emit("deleteOption", { id, parent: itemToDo });
  });
  return itemToDo;
}
function recoverOptions(parent) {
  const todos = getLS("optionsList") || [];
  if (todos.length > 0) {
    const lastTodo = todos[todos.length - 1];
    const lastTodoId = Number.parseInt(lastTodo.id.replace("#", ""));
    console.log(todos, lastTodoId);
    appState.setState("todos", todos);
    appState.setState("id", lastTodoId);
    todos.forEach((todo) => {
      option({ parent, id: todo.id, title: todo.title, weight: todo.weight });
    });
  }
}
function addOption(parent) {
  eventEmitter.clear("addOption");
  eventEmitter.on("addOption", () => {
    const curID = appState.getState("id");
    console.log(curID);
    const newID = `#${curID + 1}`;
    option({ parent, id: newID });
    const newTodo = {
      id: newID,
      title: "",
      weight: ""
    };
    appState.setState("id", curID + 1);
    const todos = appState.getState("todos") || [];
    const updatedTodos = [...todos, newTodo];
    appState.setState("todos", updatedTodos);
  });
}
function clearList(parent) {
  eventEmitter.clear("clearList");
  eventEmitter.on("clearList", () => {
    parent.innerHTML = "";
    appState.setState("id", 0);
    appState.setState("todos", [{ id: "#1", title: "", weight: "" }]);
    clearLS("optionsList");
    setLS("optionsList", [{ id: "#1", title: "", weight: "" }]);
    recoverOptions(parent);
  });
}
function toDo(parent) {
  const list = createElement({
    tag: "ul",
    classes: ["todo"],
    parent
  });
  recoverOptions(list);
  addOption(list);
  clearList(list);
  return list;
}
function btn(params) {
  const { text, parent, classes = [], onClick } = params;
  const elem = createElement({
    text,
    tag: "div",
    parent,
    classes
  });
  elem.addEventListener("click", onClick);
  return elem;
}
function clearBtn(parent) {
  const elem = btn({
    text: "Clear List",
    parent,
    classes: ["btn", "clear-btn", "btn_clickable"],
    onClick: () => eventEmitter.emit("clearList")
  });
  return elem;
}
function cleanUpOptions() {
  eventEmitter.on("cleanUpOptions", () => {
    const todos = getLS("optionsList") || [];
    if (todos.length > 1) {
      let todos2 = getLS("optionsList") || [];
      todos2 = todos2.filter((todo) => !(todo.title.trim() === "" && todo.weight.trim() === ""));
      setLS("optionsList", todos2);
      appState.setState("todos", todos2);
    }
  });
}
function modal(params) {
  const { parent, classes, text } = params;
  const overlay = createElement({
    tag: "div",
    classes: ["modal-overlay"],
    parent
  });
  createElement({
    tag: "div",
    id: "modal",
    text,
    classes: [...classes || [], "modal"],
    parent: overlay
  });
  overlay.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement) {
      overlay.remove();
    }
  });
  return overlay;
}
function modalNonEmpty(parent) {
  const elem = modal({
    text: "You need at least two valid options to proceed. Please add options with non-empty titles and weights > 0",
    parent,
    classes: ["modal-non-empty"]
  });
  return elem;
}
function strtBtn(parent) {
  cleanUpOptions();
  const elem = btn({
    text: "Start",
    parent,
    classes: ["btn", "start-btn", "btn_clickable"],
    onClick: () => {
      eventEmitter.emit("cleanUpOptions");
      const todos = getLS("optionsList") || [];
      console.log(todos);
      if (todos === null || todos.length < 2) {
        return modalNonEmpty(parent);
      } else {
        eventEmitter.emit("changePage", "/decision-picker");
      }
    }
  });
  return elem;
}
function addBtn(parent) {
  const elem = btn({
    text: "Add Option",
    parent,
    classes: ["btn", "add-btn", "btn_clickable"],
    onClick: () => eventEmitter.emit("addOption")
  });
  return elem;
}
function reloadLS() {
  const todos = getLS("optionsList");
  const sound = getLS("sound");
  if (!todos) {
    setLS("optionsList", appState.getState("todos"));
  }
  if (!sound) {
    setLS("sound", "on");
  }
}
function homePage(parent) {
  reloadLS();
  const header = createElement({
    tag: "header",
    classes: ["header"],
    parent
  });
  h1(header);
  const main = createElement({
    tag: "main",
    classes: ["main", "home-page"],
    parent
  });
  toDo(main);
  addBtn(main);
  clearBtn(main);
  strtBtn(main);
}
function soundSwitch() {
  eventEmitter.clear("soundSwitch");
  eventEmitter.on("soundSwitch", (e) => {
    let soundStatus = getLS("sound");
    if (soundStatus === null) {
      soundStatus = "on";
    }
    const target = e.target;
    if (!target || target === null) return;
    const musicIcon = target.closest(".fa-music") || target.closest(".fa-volume-xmark");
    if (musicIcon) {
      if (musicIcon.classList.contains("fa-music")) {
        musicIcon.classList.replace("fa-music", "fa-volume-xmark");
        soundStatus = "off";
      } else if (musicIcon.classList.contains("fa-volume-xmark")) {
        musicIcon.classList.replace("fa-volume-xmark", "fa-music");
        soundStatus = "on";
      }
    }
    setLS("sound", soundStatus);
  });
}
function canvasElem(params) {
  const { parent, classes = [] } = params;
  const elem = createElement({
    tag: "canvas",
    parent,
    classes: ["wheel-canvas", ...classes],
    attributes: { width: "600", height: "600" },
    id: "canvas"
  });
  return elem;
}
function drawWheel(canvas, options) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 20;
  const totalWeight = options.reduce((acc, option2) => acc + (Number(option2.weight) || 1), 0);
  let startAngle = 0;
  options.forEach((option2, i) => {
    const weight = Number(option2.weight) || 1;
    const angle = weight / totalWeight * (2 * Math.PI);
    const color = appState.getState("wheelColors")[i];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "#43304b";
    ctx.lineWidth = 2;
    ctx.stroke();
    const textAngle = startAngle + angle / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(textAngle);
    ctx.fillStyle = "#43304b";
    ctx.font = "bold 18px Nunito";
    ctx.textAlign = "start";
    ctx.textBaseline = "middle";
    ctx.fillText(option2.title, 40, 0);
    ctx.restore();
    startAngle += angle;
  });
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "#a35d85";
  ctx.fill();
  ctx.stroke();
}
function drawArrow(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;
  ctx.fillStyle = "#f8b5cb";
  ctx.strokeStyle = "#43304b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - 20, centerY - radius - 5);
  ctx.lineTo(centerX + 20, centerY - radius - 5);
  ctx.lineTo(centerX, centerY - radius + 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
function easeOut(t) {
  return 1 - (1 - t) * (1 - t);
}
function getWinner(rotation, options) {
  let normalizedRotation = rotation % (2 * Math.PI);
  if (normalizedRotation < 0) {
    normalizedRotation += 2 * Math.PI;
  }
  const segmentAngle = 2 * Math.PI / options.length;
  const index = Math.floor(normalizedRotation / segmentAngle);
  console.log("Selected Option:", options[index]);
  return options[index];
}
async function spinWheel(canvas, options) {
  const ctx = canvas == null ? void 0 : canvas.getContext("2d");
  if (!ctx) return null;
  let rotation = 0;
  const spinTime = appState.getState("spinTime");
  const start = performance.now();
  const totalRotation = Math.random() * 3 + 3;
  return new Promise((resolve) => {
    function animateWheel(time) {
      if (!ctx) return;
      try {
        const elapsed = time - start;
        const progress = Math.min(elapsed / spinTime, 1);
        rotation = easeOut(progress) * totalRotation * Math.PI;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel(canvas, options);
        ctx.restore();
        drawArrow(canvas);
        if (progress < 1) {
          requestAnimationFrame(animateWheel);
        } else {
          if (getLS("sound") === "on") {
            const winSound = new Audio("./sounds/game-bonus.mp3");
            winSound.currentTime = 0;
            winSound.play();
          }
          const selectedOption = getWinner(rotation, options);
          console.log("Winner:", selectedOption);
          resolve(selectedOption);
        }
      } catch (error) {
        console.error("Error during animation:", error);
        resolve(null);
      }
    }
    requestAnimationFrame(animateWheel);
  });
}
function wheel(parent) {
  const wheelContaine = createElement({
    tag: "div",
    classes: ["wheel"],
    parent
  });
  const elem = canvasElem({ parent: wheelContaine });
  const rawOptions = getLS("optionsList");
  const options = Array.isArray(rawOptions) ? rawOptions : [];
  drawWheel(elem, options);
  drawArrow(elem);
  eventEmitter.on("spinWheel", () => {
    spinWheel(elem, options).then((winner) => {
      console.log("Выбранный вариант:", winner);
    });
  });
  return elem;
}
function generateColors() {
  eventEmitter.on("generateColors", () => {
    const optionsList = getLS("optionsList");
    const wheelColors = Array.from(
      { length: optionsList.length },
      () => `hsl(${Math.random() * 360}, 65%, 85%)`
    );
    appState.setState("wheelColors", wheelColors);
  });
}
function numInput(params) {
  const { parent } = params;
  const fontAwesomeClasses = ["fa-solid", "fa-stopwatch-20", "fa-2xl"];
  const id = "duration";
  const duration = createElement({
    tag: "div",
    parent,
    classes: ["duration"]
  });
  createElement({
    tag: "label",
    parent: duration,
    classes: ["duration-lable"],
    attributes: { for: id },
    children: [createElement({ tag: "i", classes: [...fontAwesomeClasses, "fontAwesome"] })]
  });
  inputText();
  const inputTime = createElement({
    tag: "input",
    parent: duration,
    classes: ["input"],
    id,
    attributes: {
      type: "number",
      name: "time",
      placeholder: "Time",
      value: "5"
    }
  });
  inputTime.addEventListener("input", () => {
    appState.setState("spinTime", Number.parseInt(inputTime.value) * 1e3);
  });
  return duration;
}
function btnAwesome(params) {
  const fontAwesomeClasses = ["fa-solid", "fa-music", "fa-xl"];
  const { parent } = params;
  const elem = createElement({
    tag: "div",
    parent,
    classes: ["btn", "btn_clickable", "btn-sound"],
    children: [createElement({ tag: "i", classes: [...fontAwesomeClasses, "fontAwesome"] })]
  });
  elem.addEventListener("click", (e) => eventEmitter.emit("soundSwitch", e));
  return elem;
}
function decisionPicker(parent) {
  const todos = getLS("optionsList") || [];
  if (!todos || todos.length < 2) {
    eventEmitter.emit("changePage", "/");
  }
  generateColors();
  soundSwitch();
  eventEmitter.emit("generateColors");
  const header = createElement({
    tag: "header",
    classes: ["header"],
    parent
  });
  h1(header);
  const main = createElement({
    tag: "main",
    classes: ["main", "decision-picker"],
    parent
  });
  const btnContainer = createElement({
    tag: "div",
    classes: ["btn-container"],
    parent: main
  });
  btnAwesome({ parent: btnContainer });
  numInput({ parent: btnContainer });
  btn({
    text: "RUN!",
    parent: main,
    classes: ["btn", "btn_clickable"],
    onClick: () => eventEmitter.emit("spinWheel")
  });
  wheel(main);
  btn({
    text: "Home Page",
    parent: main,
    classes: ["btn", "btn_clickable"],
    onClick: () => eventEmitter.emit("changePage", "/")
  });
}
const BASE_PATH = window.location.hostname.includes("github.io") ? "/dzichonka-JSFE2024Q4/decision-making-tool" : "";
function createRouter(container) {
  function renderPage(path) {
    container.innerHTML = "";
    const cleanPath = path.startsWith(BASE_PATH) ? path.replace(BASE_PATH, "") : path;
    if (cleanPath === "/" || cleanPath === "" || cleanPath === "/home") {
      homePage(container);
    } else if (cleanPath === "/decision-picker") {
      decisionPicker(container);
    } else {
      throw new Error(`Router doesn't work: received path "${path}"`);
    }
  }
  function navigateTo(path) {
    const fullPath = path.startsWith(BASE_PATH) ? path : `${BASE_PATH}${path}`;
    window.location.hash = fullPath.replace(BASE_PATH, "");
    renderPage(fullPath);
  }
  eventEmitter.on("changePage", navigateTo);
  window.addEventListener("hashchange", () => renderPage(window.location.hash.slice(1)));
  renderPage(window.location.hash.slice(1) || "/");
  return { navigateTo };
}
const App = (parent) => {
  const container = createElement({
    tag: "div",
    classes: ["container"],
    parent
  });
  createRouter(container);
};
const root = createElement({
  tag: "div",
  id: "app"
});
document.body.prepend(root);
App(root);
//# sourceMappingURL=index-8J5nxHwK.js.map
