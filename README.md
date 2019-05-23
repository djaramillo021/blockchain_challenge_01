# Blockchain Challenge 01

## Address generation anomalies

Crypto-currency wallets rely on several *Bitcoin Improvement Proposal (BIPs)* as the methods to generate payment addresses stemmed from a list of words usually called *mnemonics*. There are many implementations of such BIPs (i.e. BIP39, BIP44) for several programming languages that include C++, Python, JavaScript, etc. Unfortunately, and for our surprise, we have found cases in which the generated addresses do not match across implementations for the same given mnemonics. For this reason, we have created a program that do exactly the same thing, implemented in two programming languages, C++ and JavaScript. We have a list of mnemonics for which the resulting addresses are **not** the same!

Your task is to diagnose the problem and the cause of divergence in the two versions of the program. If arriving at a concrete implemented solution is not possible at this time, you need to create a document with a thorough description of the problem and an *action plan* about how to solve it. Another acceptable solution is to use another JavaScript program or library that would match the C++ version. *Use the C++ program results as your ground truth.* In most cases, you would likely have to debug both programs at the same time and arrive at the point where things start to diverge.

As a warm up, you will see that the JavaScript version only supports generating addresses for Bitcoin *Mainnet*. You need to add the necessary code to support *Testnet* addresses as well, just like the C++ version does.

When running the program you are responsible to figure out how to install the required compilers/interpreters and libraries. For the C++ code you will need to install the following libraries in your environment:

* libbitcoin
* Boost (you need to figure out a working version)

You may then compile the code with the following command:
```
$ g++ -std=c++11 bip44-quick-gen.cpp -o bip44-quick-gen -lbitcoin -lboost_system
```

To run it, you may do:
```
$ ./bip44-quick-gen <mainnet | testnet>
```

As you can see, you need to specify in the command line the network (mainnet / testnet) that you want to generate addresses for. As soon as you run the program, it will ask you for any mnemonics of your choice or just press ENTER to generate a random one.

For JavaScript, feel free to use any recent version of Node (8.0+). Install `bitcore-lib` and `bitcore-mnemonic` libraries.

**All things said, these are your tasks:**
1. Add Testnet address support for the JavaScript program.
2. For the following mnemonics, determine with which one(s) the generated addresses do **not** match. Once you have identified that, proceed to diagnose the problem giving a **thorough** explanation of the root cause. Propose a solution with a clear *action plan* to take. If you can implement a working solution, Excellent! You may want to try several JavaScript libraries of your choice in contrast to `bitcore-lib` to see if it can match the C++ program results. That would also count as a working solution.

__Mnemonic List__:
1. catch vintage chimney ginger eyebrow glue delay field sister crime hungry open spice hybrid rely junior trust rubber kick bonus glad vanish witness pair
2. burst erase release since hurry width million barrel end oyster fish napkin jacket amount drama hybrid clean cost pottery drill sword physical blood mad
3. table target six shield banner matrix tourist ghost plate ten bridge citizen wolf sausage priority guilt power glide pact swap border start across square
4. hard found deputy victory road crop guitar vessel seminar rib december fog reunion leader shaft joy earth start boss three cake basic advice awkward

What of the previous mnemonics yield different addresses?

***Good Luck!!***
