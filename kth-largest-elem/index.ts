class MaxHeap {
    heap: number[]

    constructor() {
        this.heap = [];
    }

    parent(idx) {
        return Math.floor((idx - 1) / 2);
    }

    left(idx) {
        return (idx * 2) + 1
    }

    right(idx) {
        return (idx * 2) + 2
    }

    add(el) {
        this.heap.push(el);

        // reset our heap
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        let currIdx = index;
        let parentIdx = this.parent(index);

        while (currIdx > 0) {
            // make swap
            if (this.heap[currIdx] > this.heap[parentIdx]) {
                const tmp = this.heap[currIdx];

                this.heap[currIdx] = this.heap[parentIdx];
                this.heap[parentIdx] = tmp;
            }

            currIdx = parentIdx;
            parentIdx = this.parent(parentIdx);
        }
    }

    heapifyDown() {
        let currIdx = 0;

        while (this.heap[this.left(currIdx)] != null) {
            let largerIdx = this.left(currIdx);
            const right = this.heap[this.right(currIdx)];

            if (right != null && right > this.heap[largerIdx]) {
                largerIdx = this.right(currIdx);
            }

            if (this.heap[currIdx] > this.heap[largerIdx]) {
                break;
            } else {
                const tmp = this.heap[currIdx];

                this.heap[currIdx] = this.heap[largerIdx];
                this.heap[largerIdx] = tmp;
            }

            currIdx = largerIdx;
        }
    }

    shift() {
        if (!this.heap.length) return null;

        const shifted = this.heap[0];

        // move end of heap to the root and then heap downward
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();

        return shifted;
    }
}

function findKthLargest(nums: number[], k: number): number {
    const heap = new MaxHeap();

    for (let i = 0; i < nums.length; i++) {
        heap.add(nums[i]);
    }

    let popped = 1;
    let curr = heap.shift();

    while (popped < k) {
        const shifted = heap.shift();
        curr = shifted;
        popped++;
    }

    return curr;
};
