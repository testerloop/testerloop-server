// Utility for Edge types where the mapper contains the node and cursor.
export const edgeResolvers = {
    node: <T>(parent: { node: T }): T => parent.node,
    cursor: (parent: { cursor: string }) => parent.cursor,
}
