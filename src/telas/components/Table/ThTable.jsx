import React, { useCallback, useEffect, useRef, useState } from "react";

export default function ThTable({
  title,
  colnam,
  defW,
  minW,
  i,
  tableRef,
  divRef,
  totalqtd,
  columns,
  defWTablet,
}) {
  const mouseDown = (index) => {
    setActiveIndex(index);
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function handleWindowResize() {
    setWindowSize(getWindowSize());
  }

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const [thWidth, setThWidth] = useState(
    windowSize.innerWidth <= 1400 ? defWTablet : defW
  );
  const [activeIndex, setActiveIndex] = useState(null);

  window.addEventListener("resize", () => {
    if (
      tableRef?.current?.offsetWidth <= divRef?.current?.offsetWidth &&
      title.length > 0 &&
      windowSize.innerWidth > 1400
    ) {
      return setThWidth(
        ref?.current?.offsetWidth +
          Math.ceil(
            (divRef?.current?.offsetWidth - tableRef?.current?.offsetWidth) /
              totalqtd
          )
      );
    } else if (title.length > 0 && windowSize.innerWidth > 1400) {
      return setThWidth(
        defW -
          Math.ceil(
            (tableRef?.current?.offsetWidth - divRef?.current?.offsetWidth) /
              totalqtd /
              2
          )
      );
    }
  });

  var teste2 = true;
  var ini = 0;
  var tam = 0;
  const ref = useRef();
  const mouseMove = useCallback(
    (e) => {
      if (title.length > 0) {
        if (teste2) {
          ini = e.clientX;
          tam = ref.current.offsetWidth;
          teste2 = false;
        }

        const width = e.clientX - ini + tam;

        if (tableRef?.current?.offsetWidth >= divRef?.current?.offsetWidth) {
          if (width >= minW) {
            return setThWidth(width);
          }
          return setThWidth(ref?.current?.offsetWidth);
        } else {
          return (
            setThWidth(
              divRef?.current?.offsetWidth -
                tableRef?.current?.offsetWidth +
                ref?.current?.offsetWidth +
                20
            ),
            setActiveIndex(null)
          );
        }
      }
    },
    [activeIndex]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
    teste2 = true;
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  useEffect(() => {
    if (
      windowSize.innerWidth > 1400 &&
      tableRef?.current?.offsetWidth <= divRef?.current?.offsetWidth - 86 &&
      title.length > 0
    ) {
      return setThWidth(
        ref?.current?.offsetWidth +
          Math.ceil(
            (divRef?.current?.offsetWidth -
              86 -
              tableRef?.current?.offsetWidth) /
              totalqtd
          )
      );
    } else if (
      windowSize.innerWidth > 1400 &&
      title.length > 0 &&
      tableRef?.current?.offsetWidth - 86 >= divRef?.current?.offsetWidth &&
      totalqtd < 10
    ) {
      return setThWidth(
        ref?.current?.offsetWidth -
          Math.ceil(
            (tableRef?.current?.offsetWidth - divRef?.current?.offsetWidth) /
              totalqtd
          )
      );
    }
  }, [columns]);

  return (
    <th
      ref={ref}
      className={
        `relative text-center bg-dana p-3 ` +
        (i == 0 && " rounded-ss-lg ") +
        (i == totalqtd && " rounded-se-lg ")
      }
      style={{ width: thWidth + "px" }}
    >
      <div
        onMouseDown={() => mouseDown(i)}
        className={`w-2 h-full absolute border-r-4 tablet:border-r-2 hover:cursor-col-resize border-box block top-0 right-0  z-[4] border-[#166a9f]  active:border-[#60a9d7] hover:border-[#499dd2] ${
          activeIndex === i ? "active" : "idle"
        }`}
      />
      <span>{title}</span>
    </th>
  );
}
