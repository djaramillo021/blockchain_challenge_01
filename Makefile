CXX = g++
CXXFLAGS =-g -std=c++11 -Wfatal-errors -Wall  -pedantic 
CXXFLAGS +=`pkg-config --cflags libbitcoin`
LDFLAGS += `pkg-config --libs libbitcoin`

BIN=prog

SRC=$(wildcard *.cpp)
OBJ=$(SRC:%.cpp=%.o)

all: $(OBJ)
	$(CXX)  -o $(BIN) $^ $(LDFLAGS) -lgmp

%.o: %.c
	$(CXX) $(CXXFLAGS) $@ -c $<

clean:
	rm -f *.o
	rm $(BIN)
