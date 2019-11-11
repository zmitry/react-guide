# Graph data structure intro for web developers

## What graph data structure means.

In short graph is set of nodes and set of edges which define relations between nodes.

There are several variations of graph datastructure. Multigraphs, directed graphs, undirected graphs, etc. 

Graph representation in code. Graph can be represented using basic data structures in several ways. For production cases implementation might be adjasted to use cases but usually there are 3 way of represenating graph using built in data structures. 
 - Adjacency list
 - Adjacency matrix
 - Edge list 

Whereas first two are useful for libraries, last one is useful for serialization and human frienly look of graph.
[More info](https://www.geeksforgeeks.org/graph-and-its-representations/)


## graph and graph algorithms

Graph data structure can be applied to almost anything starting from excel table ending relations for database. 
The main advantage of graph data structure is that it allows you to apply all the computer science algorithms related to graphs. Once you figured out how to represent your domain logic as graph you can apply all the power of graph alogrithms on solving your problem. 

Useful graph algorithms

- [DSF](https://en.wikipedia.org/wiki/Depth-first_search) and [BFS](https://en.wikipedia.org/wiki/Breadth-first_search) allow you to walk your graph with special order.
- [Topological soring](https://en.wikipedia.org/wiki/Topological_sorting) allows you to determine if graph is [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) and kind of hierarchical order where from node will always before to node, interesting thing that you might have multiple topological orderings so you might need to choose how to make it deterministic.
- [Kahn algorithm](https://www.techiedelight.com/kahn-topological-sort-algorithm/] alogrithm for finding topological order)
- [SCC](https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm)- Stronly connected components, allows you to find strong connections in your graph.
- [A*](https://en.wikipedia.org/wiki/A*_search_algorithm) Intersting algorithm for finding shortest path with heuristics based on caclucating distance between current point and destination point on each step. This is similar to [Dijkstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) but I found it more useful in realworld. 

You can find by links more algorithms, such as network simplex (minimum cost flow), prim, connectivity problems, graph coloring 

- https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/ 
- https://neo4j.com/developer/graph-algorithms/
- https://neo4j.com/docs/graph-algorithms/current/

## Useful graph libraires

Probably the most common format for graph representation is dot format it allows you to easily express graph and visualize it using graphviz library http://viz-js.com, https://github.com/CyberhavenInc/graphviz-wasm, https://github.com/mdaines/viz.js. With skills that allow you to represent graph visally you can easily debug your code and work on your application logic. As next step it's better to choose some library to manipulate graph datastructure using more abstract methods. I can recommend the following.

- https://github.com/dagrejs/graphlib
- https://github.com/zmitry/graphlib (same as previous but with tree shaking)
- https://github.com/anvaka/ngraph.graph

In case you need to visualize graph in your application you can take a look at some libraries for graph vizualization. 
There are plenty of them. I'd categorize them into 3 types (for simlicity).

Force based: 
- https://github.com/d3/d3-force
- https://github.com/anvaka/VivaGraphJS
- https://github.com/crubier/react-graph-vis#readme
- https://visjs.github.io/vis-network/examples/ 
- https://ialab.it.monash.edu/webcola/

Layered:
- https://github.com/mdaines/viz.js
- https://github.com/CyberhavenInc/graphviz-wasm
- https://js.cytoscape.org
- https://github.com/dagrejs/graphlib
- https://github.com/erikbrinkman/d3-dag

Domain specific: 
- https://www.data-to-viz.com/graph/arc.html
- https://github.com/zmitry/react-arc-graph
- https://www.d3-graph-gallery.com/arc.html





