#include <bitcoin/bitcoin.hpp>
#include <boost/format.hpp>
#include <boost/algorithm/string.hpp>

#define BIP_NUMBER 44

using namespace bc;

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std:cerr << "Syntax: wallet-get <net>" << std::endl;
        return -1;
    }
    const char* net = argv[1];

    uint64_t net_prefixes;
    uint32_t coin_bip44_id;
    uint8_t address_version;

    if (strcmp(net, "mainnet") == 0) {
        net_prefixes = wallet::hd_private::mainnet;
        coin_bip44_id = 0;
        address_version = wallet::ec_private::mainnet;
    } else if (strcmp(net, "testnet") == 0) {
        net_prefixes = wallet::hd_private::testnet;
        coin_bip44_id = 1;
        address_version = wallet::ec_private::testnet;
    } else {
        std::cerr << "Invalid network specified" << std::endl;
        return -1;
    }

    wallet::word_list mnemonic_words;
    std::string input_words;

    std::cout << "Enter mnemonic (empty to autogenerate): ";
    std::getline(cin, input_words);
    if (input_words == "") {
        data_chunk my_entropy(32);
        pseudo_random_fill(my_entropy);
        mnemonic_words = wallet::create_mnemonic(my_entropy);
        std::cout << boost::format("%s") % bc::join(mnemonic_words) << std::endl;
    } else {
        boost::split(mnemonic_words, input_words, boost::is_space());
    }

    auto hd_seed = wallet::decode_mnemonic(mnemonic_words);
    data_chunk seed_chunk(to_chunk(hd_seed));

    auto m = wallet::hd_private(seed_chunk, net_prefixes);
    auto m_purpose = m.derive_private(wallet::hd_first_hardened_key + BIP_NUMBER);
    auto m_coin = m_purpose.derive_private(wallet::hd_first_hardened_key + coin_bip44_id);
    auto m_account = m_coin.derive_private(wallet::hd_first_hardened_key + 0);
    auto m_ext = m_account.derive_private(0);

    std::cout << std::endl;
    std::cout << "Account extended PrvKey: " << m_account << std::endl;
    std::cout << "Account extended PubKey: " << m_account.to_public() << std::endl;
    std::cout << std::endl;
    std::cout << "BIP32 Extended Private Key: " << m_ext << std::endl;
    std::cout << "BIP32 Extended Public Key:  " << m_ext.to_public() << std::endl;
    std::cout << std::endl;

    for (int i = 0; i < 20; i++) {
        auto mi = m_ext.derive_private(i);
        auto Mi = mi.to_public();

        auto pv_key = wallet::ec_private(
            mi.secret(), address_version);

        auto payment_addr = pv_key.to_payment_address();

        std::cout << boost::format("m/%d'/%d'/%d'/%d/%d: %s") % BIP_NUMBER % coin_bip44_id % 0 % 0 % i % payment_addr.encoded() << std::endl;
    }

    std::cout << std::endl;

    return 0;
}
