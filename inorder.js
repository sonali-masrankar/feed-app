//  Implement In-order Tree Traversal to print all nodes of a Binary Tree.

// Use classes for encapsulation of data. Avoided uisng classes as it transpiles into a much larger source code.

// following is the initial state of the Binary Tree and skeleton for a node. 

function Node (data) {
  this.data = data || null
  this.left = null
  this.right = null
}

const root = new Node()

// insert
function insertNewNode (currentNode, newNode) {
  if (newNode.data < currentNode.data) {
    if (currentNode.left === null) {
      currentNode.left = newNode
    } else {
      insertNewNode(currentNode.left, newNode)
    }
  } else {
    if (currentNode.right === null) {
      currentNode.right = newNode
    } else {
      insertNewNode(currentNode.right, newNode)
    }
  }
}
function insert (data) {
  if (root.data === null) {
    root.data = data
  } else {
    const newNode = new Node(data)
    insertNewNode(root, newNode)
  }
}

// inorder
/*
  for 'n' nodes. time complexity of the following implementation is O(n)
  Space complexity is O(h); where h is the height of the Binary Tree
*/
function inorder (node) {
  if (node.left !== null) {
    inorder(node.left)
  }
  console.log(node.data)
  if (node.right !== null) {
    inorder(node.right)
  }
}

(function runTest () {
  const nodes = [15, 25, 10, 7, 22, 17, 13, 5, 9, 27]
  nodes.forEach(node => insert(node))
  inorder(root)
})()

