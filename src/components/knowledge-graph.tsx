"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as d3 from "d3-force";
import {
  GRAPH_DATA,
  GRAPH_CATEGORIES,
  GraphNode,
  GraphLink,
  NodeGroup,
} from "@/data/graph-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Layers,
  X,
} from "lucide-react";

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<NodeGroup | "all">("all");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Transform state for zoom & pan
  const transformRef = useRef<{ x: number; y: number; k: number }>({
    x: 0,
    y: 0,
    k: 1,
  });

  // Keep live mutable nodes and links for D3 simulation
  const simulationRef = useRef<any>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<any[]>([]);

  // Drag tracking
  const dragRef = useRef<{
    isDragging: boolean;
    draggedNode: GraphNode | null;
    startX: number;
    startY: number;
    hasMoved: boolean;
  }>({
    isDragging: false,
    draggedNode: null,
    startX: 0,
    startY: 0,
    hasMoved: false,
  });

  // Pan tracking
  const panRef = useRef<{
    isPanning: boolean;
    startX: number;
    startY: number;
  }>({
    isPanning: false,
    startX: 0,
    startY: 0,
  });

  // Connected nodes map for hover/selection highlights
  const neighborsMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    GRAPH_DATA.links.forEach((l) => {
      const s = typeof l.source === "string" ? l.source : (l.source as any).id;
      const t = typeof l.target === "string" ? l.target : (l.target as any).id;
      if (!map.has(s)) map.set(s, new Set());
      if (!map.has(t)) map.set(t, new Set());
      map.get(s)!.add(t);
      map.get(t)!.add(s);
    });
    return map;
  }, []);

  // Find node at screen coordinates
  const getNodeAtPosition = useCallback(
    (screenX: number, screenY: number): GraphNode | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const x = screenX - rect.left;
      const y = screenY - rect.top;

      const { x: tx, y: ty, k } = transformRef.current;
      const simX = (x - tx) / k;
      const simY = (y - ty) / k;

      for (let i = nodesRef.current.length - 1; i >= 0; i--) {
        const node = nodesRef.current[i];
        if (node.x !== undefined && node.y !== undefined) {
          const dx = simX - node.x;
          const dy = simY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= (node.size || 10) + 4) {
            return node;
          }
        }
      }
      return null;
    },
    []
  );

  // Initialize simulation and resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 800;
    const height = Math.min(Math.max(window.innerHeight * 0.65, 520), 650);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Center transform
    transformRef.current = {
      x: (width * dpr) / 2,
      y: (height * dpr) / 2,
      k: dpr > 1 ? 0.95 : 0.9,
    };

    // Deep clone nodes and links so D3 mutation doesn't affect original data
    const nodes: GraphNode[] = GRAPH_DATA.nodes.map((n) => ({ ...n }));
    const links = GRAPH_DATA.links.map((l) => ({
      source: l.source,
      target: l.target,
      label: l.label,
    }));

    nodesRef.current = nodes;
    linksRef.current = links;

    // Build force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance((d: any) => {
            if (d.source.id === "me" || d.target.id === "me") return 110;
            return 75;
          })
          .strength(0.65)
      )
      .force("charge", d3.forceManyBody().strength(-240))
      .force("collide", d3.forceCollide().radius((d: any) => (d.size || 10) + 12).iterations(2))
      .force("center", d3.forceCenter(0, 0).strength(0.08))
      .alphaDecay(0.028);

    simulationRef.current = simulation;

    // Draw loop
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: tx, y: ty, k } = transformRef.current;
      ctx.translate(tx, ty);
      ctx.scale(k, k);

      const activeHighlight = hoveredNode || selectedNode;
      const connectedSet = activeHighlight
        ? neighborsMap.get(activeHighlight.id) || new Set()
        : null;

      // 1. Draw Links
      links.forEach((link: any) => {
        const s = link.source;
        const t = link.target;
        if (!s || !t || s.x === undefined || t.x === undefined) return;

        const isHighlighted =
          activeHighlight &&
          (s.id === activeHighlight.id || t.id === activeHighlight.id);

        const isDimmed =
          activeHighlight &&
          s.id !== activeHighlight.id &&
          t.id !== activeHighlight.id;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);

        if (isHighlighted) {
          ctx.strokeStyle = "rgba(59, 130, 246, 0.85)";
          ctx.lineWidth = 2.2;
        } else if (isDimmed) {
          ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
          ctx.lineWidth = 1.2;
        }
        ctx.stroke();

        // Draw link relationship label when highlighted
        if (isHighlighted && link.label) {
          const midX = (s.x + t.x) / 2;
          const midY = (s.y + t.y) / 2;
          ctx.save();
          ctx.font = "9px system-ui, -apple-system, sans-serif";
          ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
          ctx.textAlign = "center";
          ctx.fillText(link.label, midX, midY - 4);
          ctx.restore();
        }
      });

      // 2. Draw Nodes
      nodes.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return;

        const isCenter = node.id === "me";
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        const isConnected =
          activeHighlight &&
          (activeHighlight.id === node.id || connectedSet?.has(node.id));

        const isCategoryActive =
          activeCategory === "all" || node.group === activeCategory || isCenter;

        const isDimmed =
          (activeHighlight && !isConnected) || (!isCategoryActive && !isConnected);

        ctx.save();

        const baseRadius = node.size || 10;
        const radius = isHovered || isSelected ? baseRadius + 3 : baseRadius;

        // Outer pulse/halo for center or selected node
        if (isCenter || isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 6, 0, 2 * Math.PI);
          ctx.fillStyle = isCenter
            ? "rgba(6, 182, 212, 0.25)"
            : "rgba(59, 130, 246, 0.25)";
          ctx.fill();
        }

        // Main node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);

        if (isDimmed) {
          ctx.fillStyle = "rgba(148, 163, 184, 0.2)";
        } else {
          ctx.fillStyle = node.color || "#3B82F6";
        }
        ctx.fill();

        // Node border
        ctx.lineWidth = isSelected ? 3 : 1.8;
        ctx.strokeStyle = isSelected
          ? "#FFFFFF"
          : isCenter
          ? "#FFFFFF"
          : isDimmed
          ? "rgba(148, 163, 184, 0.25)"
          : "rgba(255, 255, 255, 0.75)";
        ctx.stroke();

        // Label text
        ctx.font = isCenter
          ? "bold 13px system-ui, -apple-system, sans-serif"
          : isSelected || isHovered
          ? "bold 11px system-ui, -apple-system, sans-serif"
          : "10px system-ui, -apple-system, sans-serif";

        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        if (isDimmed) {
          ctx.fillStyle = "rgba(148, 163, 184, 0.35)";
        } else {
          ctx.fillStyle = isCenter
            ? "#06B6D4"
            : isSelected
            ? "#3B82F6"
            : "#64748B";
        }

        ctx.fillText(node.name, node.x, node.y + radius + 4);

        ctx.restore();
      });

      ctx.restore();
    };

    simulation.on("tick", render);

    // Initial warm up ticks for faster layout stabilization
    for (let i = 0; i < 40; i++) simulation.tick();
    render();

    return () => {
      simulation.stop();
    };
  }, [neighborsMap, selectedNode, hoveredNode, activeCategory]);

  // Handle Mouse / Touch Dragging and Panning
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const node = getNodeAtPosition(e.clientX, e.clientY);
    if (node) {
      dragRef.current = {
        isDragging: true,
        draggedNode: node,
        startX: e.clientX,
        startY: e.clientY,
        hasMoved: false,
      };
      node.fx = node.x;
      node.fy = node.y;
      simulationRef.current?.alphaTarget(0.3).restart();
    } else {
      panRef.current = {
        isPanning: true,
        startX: e.clientX - transformRef.current.x,
        startY: e.clientY - transformRef.current.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Check drag
    if (dragRef.current.isDragging && dragRef.current.draggedNode) {
      const dx = Math.abs(e.clientX - dragRef.current.startX);
      const dy = Math.abs(e.clientY - dragRef.current.startY);
      if (dx > 3 || dy > 3) dragRef.current.hasMoved = true;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { x: tx, y: ty, k } = transformRef.current;

      const node = dragRef.current.draggedNode;
      node.fx = (x - tx) / k;
      node.fy = (y - ty) / k;
      return;
    }

    // Check pan
    if (panRef.current.isPanning) {
      transformRef.current.x = e.clientX - panRef.current.startX;
      transformRef.current.y = e.clientY - panRef.current.startY;
      simulationRef.current?.restart();
      return;
    }

    // Hover detection
    const hovered = getNodeAtPosition(e.clientX, e.clientY);
    if (hovered !== hoveredNode) {
      setHoveredNode(hovered);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = hovered ? "pointer" : "grab";
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragRef.current.isDragging) {
      const { draggedNode, hasMoved } = dragRef.current;
      if (!hasMoved && draggedNode) {
        // Simple click -> select
        setSelectedNode(selectedNode?.id === draggedNode.id ? null : draggedNode);
      }
      if (draggedNode) {
        draggedNode.fx = null;
        draggedNode.fy = null;
      }
      dragRef.current = {
        isDragging: false,
        draggedNode: null,
        startX: 0,
        startY: 0,
        hasMoved: false,
      };
      simulationRef.current?.alphaTarget(0);
    }

    if (panRef.current.isPanning) {
      panRef.current.isPanning = false;
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    const newK = Math.min(Math.max(transformRef.current.k * zoomFactor, 0.4), 3.2);

    transformRef.current.x = mouseX - (mouseX - transformRef.current.x) * (newK / transformRef.current.k);
    transformRef.current.y = mouseY - (mouseY - transformRef.current.y) * (newK / transformRef.current.k);
    transformRef.current.k = newK;

    simulationRef.current?.restart();
  };

  const resetView = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    transformRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      k: dpr > 1 ? 0.95 : 0.9,
    };
    setSelectedNode(null);
    simulationRef.current?.alpha(0.3).restart();
  };

  const zoomIn = () => {
    transformRef.current.k = Math.min(transformRef.current.k * 1.25, 3.2);
    simulationRef.current?.restart();
  };

  const zoomOut = () => {
    transformRef.current.k = Math.max(transformRef.current.k * 0.8, 0.4);
    simulationRef.current?.restart();
  };

  // Find all connected entities to selected node
  const selectedConnectedEntities = useMemo(() => {
    if (!selectedNode) return [];
    const connectedIds = neighborsMap.get(selectedNode.id) || new Set();
    return GRAPH_DATA.nodes.filter((n) => connectedIds.has(n.id));
  }, [selectedNode, neighborsMap]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {GRAPH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedNode(null);
              }}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer border ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-muted/50 text-muted-foreground border-border/40 hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 border rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="size-7 text-muted-foreground hover:text-foreground"
            title="Zoom In"
          >
            <ZoomIn className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="size-7 text-muted-foreground hover:text-foreground"
            title="Zoom Out"
          >
            <ZoomOut className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetView}
            className="size-7 text-muted-foreground hover:text-foreground"
            title="Reset View"
          >
            <RotateCcw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Graph Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl border bg-gradient-to-b from-card/80 to-card border-border/80 shadow-inner overflow-hidden select-none"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full block"
        />

        {/* Interactive Helper Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 text-[11px] text-muted-foreground/80 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-border/50">
          <Sparkles className="size-3 text-primary animate-pulse" />
          <span>Click to inspect • Drag nodes • Scroll to zoom</span>
        </div>

        {/* Selected Entity Drawer Card */}
        {selectedNode && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm p-4 rounded-xl bg-background/95 backdrop-blur-lg border border-border shadow-xl z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: selectedNode.color || "#3B82F6" }}
                />
                <Badge variant="secondary" className="text-[10px] font-semibold py-0 px-1.5 uppercase">
                  {selectedNode.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedNode(null)}
                className="size-5 rounded-full p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </Button>
            </div>

            <div className="mt-2">
              <h4 className="font-bold text-sm tracking-tight text-foreground">
                {selectedNode.name}
              </h4>
              {selectedNode.highlight && (
                <p className="text-xs font-medium text-primary mt-0.5">
                  {selectedNode.highlight}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Connected Entities */}
            {selectedConnectedEntities.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground mb-1.5">
                  <Layers className="size-3 text-primary" />
                  <span>Connected Relationships ({selectedConnectedEntities.length})</span>
                </div>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  {selectedConnectedEntities.map((conn) => (
                    <button
                      key={conn.id}
                      onClick={() => setSelectedNode(conn)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground text-foreground/80 font-medium transition-colors cursor-pointer border border-border/40"
                    >
                      {conn.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* External URL if present */}
            {selectedNode.url && (
              <div className="mt-3 pt-2 border-t border-border/50 flex justify-end">
                <a
                  href={selectedNode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                >
                  Visit Link
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
