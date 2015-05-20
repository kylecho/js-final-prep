Recursion
=============================================================================================
- Define a solution in terms of a smaller version of itself
- It will work as long as:
	* The definition is correct
	* You reach a base case in a finite number of steps
- No need to think about the complicated process if you can figure out such a definition
- Think locally: Figure out what`s going on at the root and don`t worry about how the algorithm
	traverses the subtrees.


Tree Count Leaves recursion
=============================================================================================
Step 2: Define a solution (Usually different for base and non-base cases)
* Base case: Leaf node
	countLeaves(tree) = 1

* Non-base case: Branch node
	countLeaves(tree) = sum of children`s leaf counts

This is a correct definition of a leaf count, and the recursion will terminate eventually because
the subtrees aren`t infinite.


Recursion
=============================================================================================
- Define a solution in terms of a smaller version of itself
- It will work as long as:
	* The definition is correct
	* You reach a base case in a finite number of steps

Why?


What can you do recursion on?
=============================================================================================
- Define a solution in terms of a smaller version of itself
- This means you need some notion of "larger" and "smaller"
- You reach a base case in a finite number of steps
- This means no infinite descending sequences
- Example: Natural numbers, linked lists, trees
- Natural numbers: There are infinitely many, but no matter how high you start, you will reach
	0 in a finite number of steps!


No infinite descending sequences
=============================================================================================
"Larger"		Natural numbers			Linked lists			  Trees
    |							 .                 O                O      
    |							 6                 O             O  O  O
    |							 5								 O				    O O    O
    |							 4                 O           O
    |							 3
    |							 2
    |              1
    |							 0
"Smaller"


Why does recursion work?
=============================================================================================
- No infinite descending sequences => You have nodes with nothing smaller than them (base cases)
- The recursive function gives the right answer for base cases, since the correct definition doesn`t
	reply on other nodes.
- The nodes directly above the base cases have recursive definitions that are correct, in terms of
	smaller nodes (which are the base cases).
- Since the recursion gives the right answer for the smaller nodes (base cases), the recursive calls for
	these nodes, which rely on the return valeus for the smaller nodes, give the right answer as well.
- Then for the same reason, recursion gives the right answer for the nodes above those nodes, and
	so on (correctness propagates upwards).


Well-founded structures
=============================================================================================
No infinite descending sequences <=> Every nonempty subset has a smallest element
Proof: Infinite descending sequence => There exists a nonempty subset without a smallest element
