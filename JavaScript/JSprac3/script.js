// Interactive SVG Drawing Tool
// Features: rectangle, line, pen (freehand), undo, clear, download
(() => {
  const svg = document.getElementById('svgCanvas');
  const shapesG = document.getElementById('shapes');

  const modeSelect = document.getElementById('modeSelect');
  const strokeColor = document.getElementById('strokeColor');
  const strokeWidth = document.getElementById('strokeWidth');
  const fillColor = document.getElementById('fillColor');
  const undoBtn = document.getElementById('undoBtn');
  const clearBtn = document.getElementById('clearBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  let drawing = false;
  let currentElem = null;
  let start = { x: 0, y: 0 };
  const history = [];

  // Utility: get mouse coords relative to svg coordinate system
  function getSVGPoint(clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    // since viewBox is 0 0 width height and we used integer width/height, this mapping is correct
    const x = (clientX - rect.left) * (svg.viewBox.baseVal.width / rect.width);
    const y = (clientY - rect.top) * (svg.viewBox.baseVal.height / rect.height);
    return { x, y };
  }

  // Create element with common attributes
  function createSVGElement(tag, attrs = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  function startDraw(evt) {
    // Only left mouse button or single touch
    if (evt.type === 'mousedown' && evt.button !== 0) return;
    evt.preventDefault();

    const pt = getSVGPoint(evt.clientX, evt.clientY);
    start = pt;
    drawing = true;
    const mode = modeSelect.value;
    const stroke = strokeColor.value;
    const width = Math.max(1, Number(strokeWidth.value) || 2);
    const fill = fillColor.value;

    if (mode === 'rect') {
      const rect = createSVGElement('rect', {
        x: pt.x, y: pt.y, width: 0, height: 0,
        stroke, 'stroke-width': width, fill: fill === '#00000000' ? 'transparent' : fill,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      currentElem = rect;
      shapesG.appendChild(rect);
    } else if (mode === 'line') {
      const line = createSVGElement('line', {
        x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y,
        stroke, 'stroke-width': width, 'stroke-linecap': 'round'
      });
      currentElem = line;
      shapesG.appendChild(line);
    } else if (mode === 'pen') {
      const path = createSVGElement('path', {
        d: `M ${pt.x} ${pt.y}`,
        stroke, 'stroke-width': width, fill: 'none',
        'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      currentElem = path;
      shapesG.appendChild(path);
    }
  }

  function updateDraw(evt) {
    if (!drawing || !currentElem) return;
    evt.preventDefault();
    const pt = getSVGPoint(evt.clientX, evt.clientY);
    const mode = modeSelect.value;

    if (mode === 'rect') {
      // handle negative width/height when dragging left/up
      const x = Math.min(start.x, pt.x);
      const y = Math.min(start.y, pt.y);
      const w = Math.abs(pt.x - start.x);
      const h = Math.abs(pt.y - start.y);
      currentElem.setAttribute('x', x);
      currentElem.setAttribute('y', y);
      currentElem.setAttribute('width', w);
      currentElem.setAttribute('height', h);
    } else if (mode === 'line') {
      currentElem.setAttribute('x2', pt.x);
      currentElem.setAttribute('y2', pt.y);
    } else if (mode === 'pen') {
      // Append a line-to to path; keep it simple — do not oversample
      const d = currentElem.getAttribute('d');
      currentElem.setAttribute('d', `${d} L ${pt.x} ${pt.y}`);
    }
  }

  function endDraw(evt) {
    if (!drawing) return;
    drawing = false;

    // If a shape was started but is effectively zero-size, remove it
    if (currentElem) {
      const tag = currentElem.tagName.toLowerCase();
      let keep = true;
      if (tag === 'rect') {
        const w = parseFloat(currentElem.getAttribute('width') || 0);
        const h = parseFloat(currentElem.getAttribute('height') || 0);
        if (w < 1 && h < 1) keep = false;
      } else if (tag === 'line') {
        const x1 = parseFloat(currentElem.getAttribute('x1') || 0);
        const x2 = parseFloat(currentElem.getAttribute('x2') || 0);
        const y1 = parseFloat(currentElem.getAttribute('y1') || 0);
        const y2 = parseFloat(currentElem.getAttribute('y2') || 0);
        if (Math.hypot(x2 - x1, y2 - y1) < 1) keep = false;
      } else if (tag === 'path') {
        const d = currentElem.getAttribute('d') || '';
        // if path only has M and no L, ignore
        if (!/L/.test(d)) keep = false;
      }

      if (!keep) {
        shapesG.removeChild(currentElem);
      } else {
        // push to history for undo
        history.push(currentElem);
      }
      currentElem = null;
    }
  }

  // Attach mouse/touch listeners
  svg.addEventListener('mousedown', startDraw);
  window.addEventListener('mousemove', updateDraw);
  window.addEventListener('mouseup', endDraw);

  // Touch support (single-touch)
  svg.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    const t = e.touches[0];
    startDraw({ type: 'mousedown', button: 0, clientX: t.clientX, clientY: t.clientY, preventDefault: () => e.preventDefault() });
  }, { passive: false });

  svg.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) return;
    const t = e.touches[0];
    updateDraw({ clientX: t.clientX, clientY: t.clientY, preventDefault: () => e.preventDefault() });
  }, { passive: false });

  window.addEventListener('touchend', (e) => {
    endDraw(e);
  });

  // Controls
  undoBtn.addEventListener('click', () => {
    const last = history.pop();
    if (last && last.parentNode) last.parentNode.removeChild(last);
  });

  clearBtn.addEventListener('click', () => {
    while (shapesG.firstChild) shapesG.removeChild(shapesG.firstChild);
    history.length = 0;
  });

  downloadBtn.addEventListener('click', () => {
    // Serialize the SVG element (exclude controls)
    const serializer = new XMLSerializer();
    const clone = svg.cloneNode(true);

    // Remove any temporary attributes that may break standalone file (like event listeners)
    // Not necessary for cloned nodes, but ensure the exported background grid is preserved.
    // Add xmlns if missing
    if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const svgString = serializer.serializeToString(clone);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.svg';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      const last = history.pop();
      if (last && last.parentNode) last.parentNode.removeChild(last);
    } else if (e.key === 'Delete') {
      e.preventDefault();
      while (shapesG.firstChild) shapesG.removeChild(shapesG.firstChild);
      history.length = 0;
    }
  });

})();
