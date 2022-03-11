#include<bits/stdc++.h>
using namespace std;
#include<cstring>
#include<cstdio>
#include<vector>
#include <ext/pb_ds/assoc_container.hpp>
using namespace __gnu_pbds;
template<class T> using indexed_set = tree<T, null_type, less<T>, 
            rb_tree_tag, tree_order_statistics_node_update>;
 
 
#define ll long long
#define cy cout<<"YES\n"
#define cn cout<<"NO\n"
#define pii pair<int,int>
#define umap unordered_map
 
// 48-57 -> 0-9
// 65-90 -> A-Z
// 97-122 -> a-z
 
 
inline namespace FastIO {
	const int BSZ = 1<<15; ////// INPUT
	char ibuf[BSZ]; int ipos, ilen;
	char nc() { // next char
		if (ipos == ilen) {
			ipos = 0; ilen = fread(ibuf,1,BSZ,stdin);
			if (!ilen) return EOF;
		}
		return ibuf[ipos++];
	}
	template<class T> void ri(T& x) { // read int or ll
		char ch; int sgn = 1;
		while (!isdigit(ch = nc())) if (ch == '-') sgn *= -1;
		x = ch-'0'; while (isdigit(ch = nc())) x = x*10+(ch-'0');
		x *= sgn;
	}
}
 
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b)
{ return (a.second < b.second); }
 
int power(int a){   
    int ans=0;
    while(a>1)
    { a/=2;ans++; }
    return ans;    
}
 
 
ll fastpow(ll a, ll b, ll m)
{
    if(b==0)
    return 1;
    if(b==1)
    return a;
    if(b%2==0)
    {
        ll take=fastpow(a,b/2,m);
        return (take*take)%m;
    }
    else
    {
        ll take=fastpow(a,b-1,m);
        return (a*take)%m;
    }
}

 
int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // freopen("nocross.in", "r", stdin);
    // freopen("nocross.out", "w", stdout);
    int cases=1;
    cin>>cases;
    // Error can be because you didn't input the entreies
    while(cases--)
    {
        int n,c;
        cin>>n>>c;
        int a1;
        int a[c+1]={0};
        int sum[c+1]={0};
        for(int i=0;i<n;i++)
        {
            cin>>a1;
            a[a1]++;
        }
        bool ans=true;
        for(int i=1;i<=c;i++)
        {
            sum[i]=sum[i-1]+a[i];
            if(a[i]>=1 && a[1]==0)
            ans=false;
        }
        int it;
        int take1,take2;
        for(int i=2;i<=c;i++)
        {
            if(a[i]==0)
            continue;
            it=1;
            while(1>0)
            {
                take1=it*i-1;
                if(take1>c)
                break;
                take2=(it+1)*i-1;
                take2=min(take2,c);
                if((sum[take2]-sum[take1])>0)
                {
                    if(a[it]==0)
                    {
                        ans=false;
                        break;
                    }
                }
                it++;
            }
        }
        if(ans)
        cy;
        else
        cn;
    }
    
    
    // max/min problem ?? try to solve using binary search
    // find result in form of mod ?? never use divide operation
    
    return 0;
}


